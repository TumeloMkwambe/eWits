import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../../Pages/Calendar/Calendar';

// Mock child components
jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

jest.mock('../../components/eventCalendar', () => {
  return function MockEventCalendar() {
    return <div data-testid="mock-event-calendar">Event Calendar</div>;
  };
});

describe('Calendar Page', () => {
  test('renders correctly with sidebar and calendar', () => {
    render(<Calendar />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-event-calendar')).toBeInTheDocument();
  });

  test('has correct layout structure', () => {
    const { container } = render(<Calendar />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
  });

  test('content area follows sidebar', () => {
    const { container } = render(<Calendar />);
    const contentArea = container.querySelector('.ContentArea');
    
    expect(contentArea).toHaveTextContent('Event Calendar');
  });
});