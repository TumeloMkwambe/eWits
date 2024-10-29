import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetails from '../../Pages/EventDetails/EventDetails';

// Mock child components
jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

jest.mock('../../components/eventDetails', () => {
  return function MockEventDetailsForm() {
    return <div data-testid="mock-event-details-form">Event Details Form</div>;
  };
});

describe('EventDetails Page', () => {
  test('renders correctly with sidebar and event details form', () => {
    render(<EventDetails />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-event-details-form')).toBeInTheDocument();
  });

  test('has correct layout structure', () => {
    const { container } = render(<EventDetails />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
  });

  test('content area contains event details form', () => {
    const { container } = render(<EventDetails />);
    const contentArea = container.querySelector('.ContentArea');
    
    expect(contentArea).toHaveTextContent('Event Details Form');
  });
});