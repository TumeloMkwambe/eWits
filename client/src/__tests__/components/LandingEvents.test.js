import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingEvents from '../../components/landingEvents';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('LandingEvents Component', () => {
  const mockEvents = [
    {
      _id: '1',
      poster: 'image1.jpg',
      name: 'Future Event',
      start_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      end_date: new Date(Date.now() + 172800000).toISOString(),  // Day after tomorrow
      location: 'Venue 1',
      likes: 5
    },
    {
      _id: '2',
      poster: 'image2.jpg',
      name: 'Past Event',
      start_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      end_date: new Date(Date.now() - 43200000).toISOString(),   // 12 hours ago
      location: 'Venue 2',
      likes: 3
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock sessionStorage
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    // Mock successful API response
    axios.get.mockResolvedValue({ data: mockEvents });

    // Mock performance API
    Object.defineProperty(window, 'performance', {
      value: { 
        getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigation' }])
      },
      writable: true
    });
  });

  test('fetches and returns only upcoming events', async () => {
    const { result } = renderHook(() => LandingEvents());

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
      const events = result.current;
      expect(events.length).toBe(1);
      expect(events[0].topic).toBe('Future Event');
    });
  });

  test('uses cached events from sessionStorage', async () => {
    const cachedEvents = [
      {
        id: '1',
        topic: 'Cached Event',
        date: '1 January 2025',
        time: '10:00 - 12:00'
      }
    ];
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(cachedEvents));

    const { result } = renderHook(() => LandingEvents());

    await waitFor(() => {
      expect(axios.get).not.toHaveBeenCalled();
      expect(result.current).toEqual(cachedEvents);
    });
  });

  test('clears cache on page reload', async () => {
    window.performance.getEntriesByType.mockReturnValue([{ type: 'reload' }]);
    
    const { result } = renderHook(() => LandingEvents());

    await waitFor(() => {
      expect(Storage.prototype.removeItem).toHaveBeenCalledWith('landing-events');
    });
  });

  test('handles API errors gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => LandingEvents());

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Error fetching events:',
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });

  test('formats dates correctly', async () => {
    const { result } = renderHook(() => LandingEvents());

    await waitFor(() => {
      const events = result.current;
      expect(events[0].time).toMatch(/^\d{2}:\d{2} - \d{2}:\d{2}$/);
      expect(events[0].date).toMatch(/^\d{1,2} [A-Za-z]+ \d{4}$/);
    });
  });
});