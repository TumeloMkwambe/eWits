import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsCard from '../../components/detailsCard';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock useParams and useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useParams: () => ({ eventID: 'test-event-123' }),
  useNavigate: () => mockNavigate
}));

describe('DetailsCard Component', () => {
  const mockEventData = {
    name: 'Test Event',
    description: 'Test Description',
    event_type: 'Technology',
    start_date: '2024-12-01T10:00:00',
    end_date: '2024-12-01T12:00:00',
    location: 'Test Venue',
    capacity: 100,
    poster: 'test-image.jpg',
    creator: {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockEventData });
  });

  test('renders loading state initially', async () => {
    render(<DetailsCard />);
    expect(screen.getByText('Event Details')).toBeInTheDocument();
  });

  test('fetches and displays event details', async () => {
    render(<DetailsCard />);

    await waitFor(() => {
      // Check basic event information
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      
      // Check creator information
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  test('formats dates and times correctly', async () => {
    render(<DetailsCard />);

    await waitFor(() => {
      expect(screen.getByText('10:00')).toBeInTheDocument(); // Start time
      expect(screen.getByText('12:00')).toBeInTheDocument(); // End time
      expect(screen.getByText('2024-12-01')).toBeInTheDocument(); // Date
    });
  });

  test('displays image when available', async () => {
    render(<DetailsCard />);

    await waitFor(() => {
      const image = screen.getByAltText('Event Poster');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test-image.jpg');
    });
  });

  test('displays "No image available" when poster is missing', async () => {
    const eventWithoutImage = { ...mockEventData, poster: null };
    axios.get.mockResolvedValue({ data: eventWithoutImage });

    render(<DetailsCard />);

    await waitFor(() => {
      expect(screen.getByText('No image available')).toBeInTheDocument();
    });
  });

  test('handles registration button click', async () => {
    render(<DetailsCard />);

    await waitFor(() => {
      const registerButton = screen.getByText('Register');
      fireEvent.click(registerButton);
      expect(mockNavigate).toHaveBeenCalledWith('/events/test-event-123/register');
    });
  });

  test('handles API error gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error');
    axios.get.mockRejectedValue(new Error('Failed to fetch event details'));

    render(<DetailsCard />);

    await waitFor(() => {
      // Check if N/A is displayed for required fields when data is missing
      const naElements = screen.getAllByText('N/A');
      expect(naElements.length).toBeGreaterThan(0);
    });

    consoleError.mockRestore();
  });

  test('displays all required field labels', async () => {
    render(<DetailsCard />);

    const expectedLabels = [
      'Event Title',
      'Description',
      'Event Type',
      'Start Date',
      'Start Time',
      'End Date',
      'End Time',
      'Venue',
      'Capacity',
      'Firstname',
      'Lastname',
      'Email'
    ];

    expectedLabels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('updates when eventID changes', async () => {
    const { rerender } = render(<DetailsCard />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('test-event-123'),
        expect.any(Object)
      );
    });

    // Mock different eventID
    jest.mock('react-router-dom', () => ({
      useParams: () => ({ eventID: 'new-event-456' }),
      useNavigate: () => mockNavigate
    }));

    rerender(<DetailsCard />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('new-event-456'),
        expect.any(Object)
      );
    });
  });
});