import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateEvent from '../../Pages/CreateEvent/CreateEvent';

// Mock child components
jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

jest.mock('../../components/eventForm', () => {
  return function MockEventForm() {
    return <div data-testid="mock-event-form">Event Form</div>;
  };
});

describe('CreateEvent Page', () => {
  test('renders correctly with sidebar and event form', () => {
    render(<CreateEvent />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-event-form')).toBeInTheDocument();
  });

  test('has correct layout structure', () => {
    const { container } = render(<CreateEvent />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
  });

  test('content area contains event form', () => {
    const { container } = render(<CreateEvent />);
    const contentArea = container.querySelector('.ContentArea');
    
    expect(contentArea).toHaveTextContent('Event Form');
  });
});