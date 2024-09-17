import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventCalendar from './EventCalendar';

// Mock the fetch function to prevent actual API calls during the test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { name: 'Event 1', start_date: '2024-09-17T10:00:00', end_date: '2024-09-17T12:00:00' },
        { name: 'Event 2', start_date: '2024-09-18T14:00:00', end_date: '2024-09-18T16:00:00' },
      ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('EventCalendar component', () => {
  test('renders the calendar component', async () => {
    render(<EventCalendar />);

    // Check if the Calendar container is rendered
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    
    // Wait for the events to load
    await waitFor(() => {
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
    });
  });

  test('fetches and renders events correctly', async () => {
    render(<EventCalendar />);

    // Ensure that fetch is called with the correct API URL
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/api/emapi/events`);

    // Wait for the events to load
    await waitFor(() => {
      const event1 = screen.getByText('Event 1');
      const event2 = screen.getByText('Event 2');
      
      expect(event1).toBeInTheDocument();
      expect(event2).toBeInTheDocument();
    });
  });

  test('handles event selection correctly', async () => {
    render(<EventCalendar />);

    // Wait for the events to load
    await waitFor(() => screen.getByText('Event 1'));

    // Simulate event click
    const event = screen.getByText('Event 1');
    fireEvent.click(event);

    // Expect an alert with the event title
    expect(window.alert).toHaveBeenCalledWith('Event 1');
  });

  test('handles slot selection correctly', async () => {
    render(<EventCalendar />);

    // Wait for the calendar to be ready
    await waitFor(() => screen.getByText('Event 1'));

    // Mock alert
    window.alert = jest.fn();

    // Simulate slot selection by triggering a click on a date cell (assuming there's a cell at this time)
    const slot = screen.getByText(/17/i); // Finding an arbitrary date slot
    fireEvent.click(slot);

    // Expect the slot selection to trigger an alert
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Selected slot'));
  });

  test('shows error when fetch fails', async () => {
    // Mock a failed fetch request
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    render(<EventCalendar />);

    // Wait for the error to occur
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching events:', 'API is down');
    });
  });
});
