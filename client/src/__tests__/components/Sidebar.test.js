import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

// Mock the Logo import
jest.mock('../../images/logo1.svg', () => 'logo-path');

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  NavLink: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaHome: () => 'HomeIcon',
  FaCalendarAlt: () => 'CalendarIcon',
  FaTicketAlt: () => 'TicketIcon',
  FaBell: () => 'BellIcon',
  FaImages: () => 'ImagesIcon'
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Sidebar Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders all navigation links', () => {
    renderWithRouter(<Sidebar />);
    
    const links = [
      { text: 'Home', path: '/home' },
      { text: 'Create Event', path: '/createevent' },
      { text: 'My Events', path: '/myevents' },
      { text: 'Calendar', path: '/calendar' },
      { text: 'Tickets', path: '/tickets' },
      { text: 'Notifications', path: '/notifications' }
    ];

    links.forEach(({ text, path }) => {
      const link = screen.getByText(text).closest('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', path);
    });
  });

  test('renders profile section', () => {
    renderWithRouter(<Sidebar />);
    
    expect(screen.getByAltText('Profile')).toBeInTheDocument();
    expect(screen.getByText('eWits')).toBeInTheDocument();
  });

  test('logout button functions correctly', () => {
    renderWithRouter(<Sidebar />);
    
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    
    fireEvent.click(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/logout');
  });
});