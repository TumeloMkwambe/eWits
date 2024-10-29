import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Logout from '../../components/logout';

// Mock Auth0
jest.mock('@auth0/auth0-react');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('Logout Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth0.mockReturnValue({
      logout: mockLogout
    });
  });

  test('renders loading message', () => {
    render(<Logout />);
    expect(screen.getByText('Logging out...')).toBeInTheDocument();
  });

  test('calls Auth0 logout on mount', () => {
    render(<Logout />);
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: process.env.CLIENT }
    });
  });
});