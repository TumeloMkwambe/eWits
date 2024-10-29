import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../components/login';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// Mock the Auth0 hook
jest.mock('@auth0/auth0-react');

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('Login Component', () => {
  // Setup mock functions and values
  const mockLoginWithRedirect = jest.fn();
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com'
  };

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Setup default Auth0 mock implementation
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null,
      loginWithRedirect: mockLoginWithRedirect,
    });

    // Setup default axios mock implementation
    axios.post.mockResolvedValue({ 
      data: { 
        name: 'Test User',
        email: 'test@example.com',
        liked_events: [],
        my_events: []
      } 
    });
  });

  test('renders login button when not authenticated', () => {
    render(<Login />);
    const loginButton = screen.getByText('Log In');
    expect(loginButton).toBeInTheDocument();
  });

  test('calls loginWithRedirect when login button is clicked', () => {
    render(<Login />);
    const loginButton = screen.getByText('Log In');
    fireEvent.click(loginButton);
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });

  test('posts user data and navigates to home when authenticated', async () => {
    // Mock authenticated state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
      loginWithRedirect: mockLoginWithRedirect,
    });

    render(<Login />);

    // Wait for the effects to run
    await waitFor(() => {
      // Check if axios.post was called with correct data
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_USER_URI}/api/users/create`,
        {
          name: mockUser.name,
          email: mockUser.email,
          liked_events: [],
          my_events: []
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Check if navigation occurred
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  test('handles API error gracefully', async () => {
    // Mock authenticated state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
      loginWithRedirect: mockLoginWithRedirect,
    });

    // Mock API error
    const consoleLogSpy = jest.spyOn(console, 'log');
    axios.post.mockRejectedValue(new Error('API Error'));

    render(<Login />);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleLogSpy.mockRestore();
  });

  test('stores user data in sessionStorage after successful login', async () => {
    // Mock authenticated state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
      loginWithRedirect: mockLoginWithRedirect,
    });

    const mockResponse = {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        liked_events: [],
        my_events: []
      }
    };

    axios.post.mockResolvedValue(mockResponse);

    render(<Login />);

    await waitFor(() => {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      expect(storedUser).toEqual(mockResponse.data);
    });
  });
});