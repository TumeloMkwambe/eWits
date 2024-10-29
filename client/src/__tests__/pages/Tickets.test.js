import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tickets from '../../Pages/Tickets/Tickets';

jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

describe('Tickets Page', () => {
  test('renders basic structure', () => {
    render(<Tickets />);
    
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Your Tickets Right here bruv')).toBeInTheDocument();
  });

  test('has correct layout classes', () => {
    const { container } = render(<Tickets />);
    
    expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
    expect(container.querySelector('.ContentArea')).toBeInTheDocument();
  });

  test('maintains consistent layout with other pages', () => {
    const { container } = render(<Tickets />);
    const contentArea = container.querySelector('.ContentArea');
    
    expect(contentArea).toBeInTheDocument();
    expect(contentArea.parentElement).toHaveClass('DashboardContainer');
  });
});