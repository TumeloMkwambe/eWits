import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplayEvents from '../../components/displayEvents';
import { BrowserRouter } from 'react-router-dom';

describe('DisplayEvents Component', () => {
  const mockEvents = [
    {
      id: '1',
      topic: 'Test Event 1',
      date: '2024-12-01',
      time: '10:00',
      location: 'Venue 1',
      img: 'test-image-1.jpg'
    },
    {
      id: '2',
      topic: 'Test Event 2',
      date: '2024-12-02',
      time: '14:00',
      location: 'Venue 2',
      img: 'test-image-2.jpg'
    }
  ];

  const mockFilteredEvents = jest.fn().mockResolvedValue(mockEvents);

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock performance.getEntriesByType
    Object.defineProperty(window, 'performance', {
      value: { 
        getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigation' }])
      },
      writable: true
    });
  });

  test('displays loading state initially', () => {
    renderWithRouter(<DisplayEvents filteredEvents={mockFilteredEvents} route="events" />);
    expect(screen.getByText('Loading events...')).toBeInTheDocument();
  });

  test('renders events after loading', async () => {
    renderWithRouter(<DisplayEvents filteredEvents={mockFilteredEvents} route="events" />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading events...')).not.toBeInTheDocument();
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    });
  });

  test('renders event details correctly', async () => {
    renderWithRouter(<DisplayEvents filteredEvents={mockFilteredEvents} route="events" />);
    
    await waitFor(() => {
      // Check for event information
      mockEvents.forEach(event => {
        expect(screen.getByText(event.topic)).toBeInTheDocument();
        expect(screen.getByText(event.date)).toBeInTheDocument();
        expect(screen.getByText(event.time)).toBeInTheDocument();
        expect(screen.getByText(event.location)).toBeInTheDocument();
      });
    });
  });

  test('creates correct links for events', async () => {
    renderWithRouter(<DisplayEvents filteredEvents={mockFilteredEvents} route="events" />);
    
    await waitFor(() => {
      const links = document.querySelectorAll('a');
      expect(links[0]).toHaveAttribute('href', '/events/1');
      expect(links[1]).toHaveAttribute('href', '/events/2');
    });
  });

  test('calls filteredEvents on mount and reload', async () => {
    renderWithRouter(<DisplayEvents filteredEvents={mockFilteredEvents} route="events" />);
    
    await waitFor(() => {
      expect(mockFilteredEvents).toHaveBeenCalled();
    });

    // Simulate reload
    Object.defineProperty(window, 'performance', {
      value: { 
        getEntriesByType: jest.fn().mockReturnValue([{ type: 'reload' }])
      },
      writable: true
    });

    renderWithRouter(<DisplayEvents filteredEvents={mockFilteredEvents} route="events" />);
    
    await waitFor(() => {
      expect(mockFilteredEvents).toHaveBeenCalledTimes(2);
    });
  });
});