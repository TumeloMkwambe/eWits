import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure the casing is correct

beforeEach(() => {
  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
    },
    writable: true,
  });
});

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
});

describe('Sidebar Component', () => {
  test('renders sidebar with navigation links', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const homeLink = screen.getByText(/Home/i);
    const createEventLink = screen.getByText(/Create Event/i);
    const myEventsLink = screen.getByText(/My Events/i);
    const ticketsLink = screen.getByText(/Tickets/i);

    expect(homeLink).toBeInTheDocument();
    expect(createEventLink).toBeInTheDocument();
    expect(myEventsLink).toBeInTheDocument();
    expect(ticketsLink).toBeInTheDocument();
  });

  test('triggers logout button click', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);
    expect(logoutButton).toBeInTheDocument(); // This checks if the button is still in the document after the click
  });
});
