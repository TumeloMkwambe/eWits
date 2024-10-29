import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../Pages/Home/Home';

// Mock all required components
jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

jest.mock('../../components/favouriteEvents', () => {
  return function MockFavouriteEvents() {
    return <div data-testid="mock-favourite-events">Favourite Events</div>;
  };
});

jest.mock('../../components/filteredEvents', () => {
  return function MockFilteredEvents({ type }) {
    return <div data-testid={`mock-filtered-events-${type}`}>Filtered Events for {type}</div>;
  };
});

jest.mock('../../components/search', () => {
  return function MockEventList() {
    return <div data-testid="mock-event-list">Event List</div>;
  };
});

describe('Home Page', () => {
  test('renders basic structure correctly', () => {
    render(<Home />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Favourite Events')).toBeInTheDocument();
  });

  test('renders all event type sections', () => {
    render(<Home />);
    
    const expectedTypes = [
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

    expectedTypes.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
      expect(screen.getByTestId(`mock-filtered-events-${type}`)).toBeInTheDocument();
    });
  });

  test('maintains correct layout structure', () => {
    const { container } = render(<Home />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
    expect(container.querySelector('.home')).toBeInTheDocument();
    expect(container.querySelector('.main-content')).toBeInTheDocument();
  });

  test('renders favourite events section first', () => {
    const { container } = render(<Home />);
    
    const mainContent = container.querySelector('.main-content');
    const firstTitle = mainContent.querySelector('h2');
    expect(firstTitle).toHaveTextContent('Favourite Events');
  });

  test('renders events containers with correct classes', () => {
    const { container } = render(<Home />);
    
    const eventContainers = container.getElementsByClassName('past-events-container');
    // One for favorites + one for each event type
    expect(eventContainers.length).toBe(13);
  });
});