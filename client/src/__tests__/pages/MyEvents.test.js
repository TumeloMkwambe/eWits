import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyEvents from '../../Pages/MyEvents/MyEvents';

// Mock child components
jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

jest.mock('../../components/createdEvent', () => {
  return function MockCreatedEvents() {
    return <div data-testid="mock-created-events">Created Events List</div>;
  };
});

describe('MyEvents Page', () => {
  test('renders all components correctly', () => {
    render(<MyEvents />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-created-events')).toBeInTheDocument();
    expect(screen.getByText('Created Events')).toBeInTheDocument();
  });

  test('has correct layout structure', () => {
    const { container } = render(<MyEvents />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
    expect(container.querySelector('.home')).toBeInTheDocument();
    expect(container.querySelector('.main-content')).toBeInTheDocument();
    expect(container.querySelector('.title-home')).toBeInTheDocument();
    expect(container.querySelector('.past-events-container')).toBeInTheDocument();
  });
});