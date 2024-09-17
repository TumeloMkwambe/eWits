import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EventDetails from './EventDetails';

// Mock the fetch function to avoid making actual API calls during the test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        title: 'Sample Event',
        date: '2024-09-17T10:00:00',
        description: 'This is a sample event description.',
        location: 'Sample Location',
      }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (id) => {
  return render(
    <Router>
      <Route path="/events/:id">
        <EventDetails />
      </Route>
    </Router>
  );
};

describe('EventDetails component', () => {
  test('renders the loading state initially', () => {
    renderComponent('1');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays event details', async () => {
    renderComponent('1');

    // Wait for the event details to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Sample Event')).toBeInTheDocument();
      expect(screen.getByText('This is a sample event description.')).toBeInTheDocument();
      expect(screen.getByText('Location: Sample Location')).toBeInTheDocument();
    });
  });

  test('handles API error correctly', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    renderComponent('1');

    // Wait for the error to be handled
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching event details:', 'API is down');
    });
  });

  test('renders action buttons correctly', async () => {
    renderComponent('1');

    // Wait for the event details to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Edit Event')).toBeInTheDocument();
      expect(screen.getByText('Delete Event')).toBeInTheDocument();
    });
  });

  // This test assumes you have some logic for editing or deleting the event
  test('interactions with buttons', async () => {
    renderComponent('1');

    await waitFor(() => {
      const editButton = screen.getByText('Edit Event');
      const deleteButton = screen.getByText('Delete Event');

      // Simulate button clicks
      fireEvent.click(editButton);
      fireEvent.click(deleteButton);

      // Expect some behavior or state change here
      // For example, you might want to check for a redirect or some state update
      // Since the actual implementation might vary, adjust accordingly
    });
  });
});
