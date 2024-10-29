import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from '../../Pages/Notifications/Notifications';

jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

describe('Notifications Page', () => {
  test('renders basic structure', () => {
    render(<Notifications />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Your Notifications here bruv')).toBeInTheDocument();
  });

  test('has correct layout classes', () => {
    const { container } = render(<Notifications />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
  });
});