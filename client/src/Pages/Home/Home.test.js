import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Home from './Home';

// Mock the performance API
beforeAll(() => {
    global.performance = {
      getEntriesByType: jest.fn(() => [{ type: 'navigate' }]), // Mock it to return a default value
    };
  });
  
describe('Home Component', () => {
  test('renders Favorite Events heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    ); // Wrap Home in MemoryRouter
    const headingElement = screen.getByText(/Favourite Events/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders all event types', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    ); // Wrap Home in MemoryRouter
    const eventTypes = [
      'Sports',
      'Religion',
      'Education',
      'Music',
      'Arts and Culture',
      'Business and Networking',
      'Food and Drink',
      'Community and Social',
      'Health and Wellness',
      'Charity and Fundraising',
      'Technology',
      'Family'
    ];

    eventTypes.forEach(type => {
      const typeElement = screen.getByText(type);
      expect(typeElement).toBeInTheDocument();
    });
  });
});
