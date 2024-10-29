import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CreatedEvents from '../../components/createdEvents';
import { fetchEvents } from '../../Requests/events';

// Mock fetchEvents
jest.mock('../../Requests/events');

describe('CreatedEvents Component', () => {
  // Mock event data
  const mockEvents = [
    {
      _id: 'event1',
      name: 'Test Event 1',
      start_date: '2024-12-01T10:00:00',
      end_date: '2024-12-01T12:00:00',
      poster: 'image1.jpg',
      location: 'Venue 1',
      likes: 5
    },
    {
      _id: 'event2',
      name: 'Test Event 2',
      start_date: '2024-12-02T14:00:00',
      end_date: '2024-12-02T16:00:00',
      poster: 'image2.jpg',
      location: 'Venue 2',
      likes: 3
    }
  ];

  // Mock user data
  const mockUser = {
    _id: 'user1',
    my_events: ['event1'] // User created event1
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock sessionStorage
    Storage.prototype.getItem = jest.fn((key) => {
      const storage = {
        'user': JSON.stringify(mockUser),
        'events': JSON.stringify(mockEvents)
      };
      return storage[key];
    });
    Storage.prototype.setItem = jest.fn();

    // Mock fetchEvents
    fetchEvents.mockResolvedValue();
  });

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('fetches events on mount', async () => {
    renderWithRouter(<CreatedEvents />);
    await waitFor(() => {
      expect(fetchEvents).toHaveBeenCalled();
    });
  });

  test('filters user created events correctly', async () => {
    renderWithRouter(<CreatedEvents />);
    
    // Wait for events to be filtered and displayed
    await waitFor(() => {
      // Should display only event1 (user's created event)
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Event 2')).not.toBeInTheDocument();
    });
  });

  test('formats event dates correctly', async () => {
    renderWithRouter(<CreatedEvents />);

    await waitFor(() => {
      // Check for formatted date and time
      expect(screen.getByText('1 December 2024')).toBeInTheDocument();
      expect(screen.getByText('10:00 - 12:00')).toBeInTheDocument();
    });
  });

  test('handles empty events list', async () => {
    // Mock empty events list
    Storage.prototype.getItem = jest.fn((key) => {
      const storage = {
        'user': JSON.stringify(mockUser),
        'events': JSON.stringify([])
      };
      return storage[key];
    });

    renderWithRouter(<CreatedEvents />);

    await waitFor(() => {
      expect(screen.getByText('Loading events...')).toBeInTheDocument();
    });
  });

  test('handles missing user data', async () => {
    // Mock missing user data
    Storage.prototype.getItem = jest.fn((key) => {
      const storage = {
        'user': null,
        'events': JSON.stringify(mockEvents)
      };
      return storage[key];
    });

    const consoleLogSpy = jest.spyOn(console, 'log');
    renderWithRouter(<CreatedEvents />);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('User: ', null);
    });

    consoleLogSpy.mockRestore();
  });

  test('displays loading state initially', () => {
    renderWithRouter(<CreatedEvents />);
    expect(screen.getByText('Loading events...')).toBeInTheDocument();
  });

  test('handles events without required fields', async () => {
    const incompleteEvents = [
      {
        _id: 'event3',
        name: 'Incomplete Event',
        // Missing dates and other fields
      }
    ];

    Storage.prototype.getItem = jest.fn((key) => {
      const storage = {
        'user': JSON.stringify(mockUser),
        'events': JSON.stringify(incompleteEvents)
      };
      return storage[key];
    });

    renderWithRouter(<CreatedEvents />);
    
    await waitFor(() => {
      expect(screen.queryByText('Invalid Date')).not.toBeInTheDocument();
    });
  });

  test('logs created events to console', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    renderWithRouter(<CreatedEvents />);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('My Events: ', expect.any(Array));
    });

    consoleLogSpy.mockRestore();
  });

  test('passes correct route prop to DisplayEvents', async () => {
    const { container } = renderWithRouter(<CreatedEvents />);
    
    await waitFor(() => {
      const links = container.querySelectorAll('a');
      links.forEach(link => {
        expect(link.href).toContain('/myevents/');
      });
    });
  });

  test('handles fetchEvents failure', async () => {
    fetchEvents.mockRejectedValue(new Error('Failed to fetch events'));
    const consoleLogSpy = jest.spyOn(console, 'log');

    renderWithRouter(<CreatedEvents />);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    consoleLogSpy.mockRestore();
  });
});