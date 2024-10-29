import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCalendar from '../../components/eventCalendar';
import axios from 'axios';
import moment from 'moment';

// Mock axios
jest.mock('axios');

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});

// Mock performance.getEntriesByType
const mockGetEntriesByType = jest.fn(() => [{ type: 'navigation' }]);
Object.defineProperty(window, 'performance', {
  value: { getEntriesByType: mockGetEntriesByType }
});

describe('EventCalendar Component', () => {
  const mockEvents = [
    {
      name: 'Test Event 1',
      start_date: '2024-12-01T10:00:00',
      end_date: '2024-12-01T12:00:00',
      event_type: 'Technology',
      location: 'Venue 1'
    },
    {
      name: 'Test Event 2',
      start_date: '2024-12-02T14:00:00',
      end_date: '2024-12-02T16:00:00',
      event_type: 'Music',
      location: 'Venue 2'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock API response
    axios.get.mockResolvedValue({ data: mockEvents });
    
    // Clear sessionStorage mock
    mockSessionStorage.getItem.mockReturnValue(null);
  });

  test('renders calendar with filter controls', () => {
    render(<EventCalendar />);
    
    // Check for filter radio buttons
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    
    // Check for filter input
    expect(screen.getByPlaceholderText(/filter events by name/i)).toBeInTheDocument();
  });

  test('loads events on mount', async () => {
    render(<EventCalendar />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URI}/api/events`,
        expect.any(Object)
      );
    });
  });

  test('uses cached events from sessionStorage if available', () => {
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockEvents));
    
    render(<EventCalendar />);
    
    expect(axios.get).not.toHaveBeenCalled();
  });

  test('filters events by name', async () => {
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockEvents));
    
    render(<EventCalendar />);
    
    const filterInput = screen.getByPlaceholderText(/filter events by name/i);
    fireEvent.change(filterInput, { target: { value: 'Test Event 1' } });
    
    await waitFor(() => {
      const events = screen.getAllByText(/test event/i);
      expect(events).toHaveLength(1);
    });
  });

  test('filters events by type', async () => {
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockEvents));
    
    render(<EventCalendar />);
    
    // Select type filter
    const typeRadio = screen.getByLabelText('Type');
    fireEvent.click(typeRadio);
    
    // Filter by technology events
    const filterInput = screen.getByPlaceholderText(/filter events by type/i);
    fireEvent.change(filterInput, { target: { value: 'Technology' } });
    
    await waitFor(() => {
      const events = screen.getAllByText(/test event/i);
      expect(events).toHaveLength(1);
    });
  });

  test('filters events by location', async () => {
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockEvents));
    
    render(<EventCalendar />);
    
    // Select location filter
    const locationRadio = screen.getByLabelText('Location');
    fireEvent.click(locationRadio);
    
    // Filter by venue
    const filterInput = screen.getByPlaceholderText(/filter events by location/i);
    fireEvent.change(filterInput, { target: { value: 'Venue 1' } });
    
    await waitFor(() => {
      const events = screen.getAllByText(/test event/i);
      expect(events).toHaveLength(1);
    });
  });

  test('handles date filter correctly', async () => {
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockEvents));
    
    render(<EventCalendar />);
    
    // Select date filter
    const dateRadio = screen.getByLabelText('Date');
    fireEvent.click(dateRadio);
    
    // Filter by date
    const filterInput = screen.getByPlaceholderText(/filter events by date/i);
    fireEvent.change(filterInput, { target: { value: '2024-12-01' } });
    
    await waitFor(() => {
      const events = screen.getAllByText(/test event/i);
      expect(events).toHaveLength(1);
    });
  });

  test('clears sessionStorage on page reload', () => {
    mockGetEntriesByType.mockReturnValue([{ type: 'reload' }]);
    
    render(<EventCalendar />);
    
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('calendar-events');
  });

  test('handles API errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    axios.get.mockRejectedValue(new Error('API Error'));
    
    render(<EventCalendar />);
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching events:', expect.any(Error));
    });
    
    consoleErrorSpy.mockRestore();
  });
});