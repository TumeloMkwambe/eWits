import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import UpcomingEvents from '../../components/upcomingEvents';
import { fetchEvents } from '../../Requests/events';

// Mock fetchEvents
jest.mock('../../Requests/events');

describe('UpcomingEvents Component', () => {
  const mockEvents = [
    {
      _id: '1',
      name: 'Future Event',
      start_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      end_date: new Date(Date.now() + 172800000).toISOString(),  // Day after tomorrow
      poster: 'image1.jpg',
      location: 'Venue 1',
      likes: 5
    },
    {
      _id: '2',
      name: 'Past Event',
      start_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      end_date: new Date(Date.now() - 43200000).toISOString(),   // 12 hours ago
      poster: 'image2.jpg',
      location: 'Venue 2',
      likes: 3
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock sessionStorage
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockEvents));
    Storage.prototype.setItem = jest.fn();
    fetchEvents.mockResolvedValue();
  });

  test('filters and displays only upcoming events', async () => {
    render(
      <BrowserRouter>
        <UpcomingEvents />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading events...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Future Event')).toBeInTheDocument();
      expect(screen.queryByText('Past Event')).not.toBeInTheDocument();
    });
  });

  test('formats dates correctly', async () => {
    render(
      <BrowserRouter>
        <UpcomingEvents />
      </BrowserRouter>
    );

    await waitFor(() => {
      const dateString = screen.getByText((content) => {
        return content.includes(new Date(mockEvents[0].start_date).getDate());
      });
      expect(dateString).toBeInTheDocument();
    });
  });

  test('fetches events on mount', async () => {
    render(
      <BrowserRouter>
        <UpcomingEvents />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(fetchEvents).toHaveBeenCalled();
    });
  });

  test('handles empty events array', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));

    render(
      <BrowserRouter>
        <UpcomingEvents />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading events...')).not.toBeInTheDocument();
    });
  });
});