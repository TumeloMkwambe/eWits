import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EventForm from '../../components/eventForm';
import axios from 'axios';
import { fetchEvents } from '../../Requests/events';

// Mock axios
jest.mock('axios');

// Mock fetchEvents
jest.mock('../../Requests/events', () => ({
  fetchEvents: jest.fn()
}));

// Mock window.history
const mockHistoryBack = jest.fn();
Object.defineProperty(window, 'history', {
  value: {
    back: mockHistoryBack
  },
  writable: true
});

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
};
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});

describe('EventForm Component', () => {
  const mockVenues = [
    { Id: 1, Name: 'Venue 1', Capacity: 100 },
    { Id: 2, Name: 'Venue 2', Capacity: 200 }
  ];

  const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    jest.clearAllMocks();
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockVenues)
      })
    );

    mockSessionStorage.getItem.mockReturnValue(JSON.stringify({
      _id: 'user123'
    }));

    axios.post.mockImplementation((url) => {
      if (url.includes('/api/storage/upload')) {
        return Promise.resolve({ data: { imageUrl: 'http://test-image.jpg' } });
      }
      if (url.includes('/api/events/create')) {
        return Promise.resolve({ data: { _id: 'event123' } });
      }
      return Promise.resolve({ data: {} });
    });

    axios.put.mockResolvedValue({ data: {} });
  });

  test('renders form with all fields', () => {
    render(<EventForm />);
    
    // Check for form title
    expect(screen.getByText('Create a New Event')).toBeInTheDocument();
    
    // Check for all form labels
    const expectedLabels = [
      'Event Title',
      'Description',
      'Event Type',
      'Start Date',
      'Start Time',
      'End Date',
      'End Time',
      'Location',
      'Capacity',
      'First Name',
      'Last Name',
      'Email',
      'Poster Image',
      'Ticket Type'
    ];

    expectedLabels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('loads venues on component mount', async () => {
    render(<EventForm />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const venueSelect = screen.getByText('Select Venue').closest('select');
    expect(venueSelect).toBeInTheDocument();
  });

  test('handles form input changes', async () => {
    render(<EventForm />);
    
    // Find inputs by their name attribute
    const titleInput = screen.getByRole('textbox', { name: '' });
    const descriptionTextarea = screen.getByRole('textbox', { name: '' });
    
    // Type into inputs
    await userEvent.type(titleInput, 'Test Event');
    await userEvent.type(descriptionTextarea, 'Test Description');
    
    expect(titleInput).toHaveValue('Test Event');
    expect(descriptionTextarea).toHaveValue('Test Description');
  });

  test('handles venue selection', async () => {
    render(<EventForm />);

    // Wait for venues to load
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Find select by its name attribute
    const locationSelect = screen.getByRole('combobox', { name: '' });
    fireEvent.change(locationSelect, { target: { value: 'Venue 1' } });

    // Find capacity input
    const capacityInput = screen.getByRole('spinbutton', { name: '' });
    expect(capacityInput).toHaveValue(100);
  });

  test('handles ticket type selection', async () => {
    render(<EventForm />);
    
    // Find ticket type select by its name attribute
    const ticketSelect = screen.getByRole('combobox', { name: '' });
    fireEvent.change(ticketSelect, { target: { value: 'paid' } });

    // Check if price inputs appear
    await waitFor(() => {
      const priceInputs = screen.getAllByRole('spinbutton', { name: '' });
      expect(priceInputs.length).toBeGreaterThan(0);
    });
  });

  test('submits form with all required data', async () => {
    render(<EventForm />);

    // Fill required fields using name attributes
    const inputs = screen.getAllByRole('textbox', { name: '' });
    const selects = screen.getAllByRole('combobox', { name: '' });
    
    // Fill text inputs
    await userEvent.type(inputs[0], 'Test Event');
    await userEvent.type(inputs[1], 'Test Description');
    await userEvent.type(screen.getByRole('textbox', { name: '' }), 'John');
    
    // Set dates
    const dateInputs = document.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[0], { target: { value: '2024-12-01' } });
    fireEvent.change(dateInputs[1], { target: { value: '2024-12-01' } });

    // Set times
    const timeInputs = document.querySelectorAll('input[type="time"]');
    fireEvent.change(timeInputs[0], { target: { value: '10:00' } });
    fireEvent.change(timeInputs[1], { target: { value: '11:00' } });

    // Submit form
    const submitButton = screen.getByText('Create Event');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test('handles file upload', async () => {
    render(<EventForm />);

    const fileInput = document.querySelector('input[type="file"]');
    await userEvent.upload(fileInput, mockFile);

    expect(fileInput.files[0]).toBe(mockFile);
    expect(fileInput.files).toHaveLength(1);
  });

  test('handles API errors', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    axios.post.mockRejectedValue(new Error('API Error'));

    render(<EventForm />);

    const submitButton = screen.getByText('Create Event');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleLogSpy.mockRestore();
  });
});