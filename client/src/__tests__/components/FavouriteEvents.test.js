import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import FavouriteEvents from '../../components/favouriteEvents';
import { fetchEvents } from '../../Requests/events';

// Mock the events API
jest.mock('../../Requests/events');

describe('FavouriteEvents Component', () => {
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

  const mockUser = {
    liked_events: ['event1']
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

    // Mock window.performance
    Object.defineProperty(window, 'performance', {
      value: {
        getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigation' }])
      },
      writable: true
    });
  });

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('fetches events on mount', async () => {
    renderWithRouter(<FavouriteEvents />);
    
    await waitFor(() => {
      expect(fetchEvents).toHaveBeenCalled();
    });
  });

  test('displays only liked events', async () => {
    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Event 2')).not.toBeInTheDocument();
    });
  });

  test('formats event dates correctly', async () => {
    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      expect(screen.getByText('1 December 2024')).toBeInTheDocument();
      expect(screen.getByText('10:00 - 12:00')).toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    renderWithRouter(<FavouriteEvents />);
    expect(screen.getByText('Loading events...')).toBeInTheDocument();
  });

  test('handles case when user has no liked events', async () => {
    Storage.prototype.getItem = jest.fn((key) => {
      const storage = {
        'user': JSON.stringify({ liked_events: [] }),
        'events': JSON.stringify(mockEvents)
      };
      return storage[key];
    });

    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      expect(screen.queryByText('Test Event 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Event 2')).not.toBeInTheDocument();
    });
  });

  test('handles missing user data', async () => {
    Storage.prototype.getItem = jest.fn((key) => {
      const storage = {
        'user': null,
        'events': JSON.stringify(mockEvents)
      };
      return storage[key];
    });

    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      expect(screen.queryByText('Test Event 1')).not.toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    fetchEvents.mockRejectedValue(new Error('API Error'));

    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      expect(screen.queryByText('Test Event 1')).not.toBeInTheDocument();
    });
  });

  test('uses correct route for navigation', async () => {
    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        expect(link.href).toContain('/events/');
      });
    });
  });

  test('refreshes data on page reload', async () => {
    // Simulate page reload
    window.performance.getEntriesByType.mockReturnValue([{ type: 'reload' }]);

    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      expect(fetchEvents).toHaveBeenCalled();
    });
  });

  test('handles malformed event data', async () => {
    const malformedEvents = [
      {
        _id: 'event1',
        name: 'Malformed Event',
        // Missing date fields
        location: 'Venue 1'
      }
    ];

    Storage.prototype.getItem = jest.fn((key) => {
      const storage = {
        'user': JSON.stringify(mockUser),
        'events': JSON.stringify(malformedEvents)
      };
      return storage[key];
    });

    renderWithRouter(<FavouriteEvents />);

    await waitFor(() => {
      expect(screen.queryByText('Invalid Date')).not.toBeInTheDocument();
    });
  });
});