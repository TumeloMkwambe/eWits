import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetailsCard from '../../Pages/EventDetailsCard/EventDetailsCard';

// Mock child components
jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

jest.mock('../../components/detailsCard', () => {
  return function MockDetailsCard() {
    return <div data-testid="mock-details-card">Details Card</div>;
  };
});

describe('EventDetailsCard Page', () => {
  test('renders correctly with sidebar and details card', () => {
    render(<EventDetailsCard />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-details-card')).toBeInTheDocument();
  });

  test('has correct layout structure', () => {
    const { container } = render(<EventDetailsCard />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
  });

  test('maintains proper nesting of components', () => {
    const { container } = render(<EventDetailsCard />);
    const contentArea = container.querySelector('.ContentArea');
    
    expect(contentArea.querySelector('div')).toContainElement(
      screen.getByTestId('mock-details-card')
    );
  });
});