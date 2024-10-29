import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoPage from '../../Pages/NoPage/NoPage';

// Mock the image import
jest.mock('../../images/wits.png', () => 'mocked-wits-image');

// Mock window.location
const mockLocation = {
  href: ''
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
});

describe('NoPage Component', () => {
  test('renders all content correctly', () => {
    render(<NoPage />);
    
    expect(screen.getByText('Oops! Page Not Found')).toBeInTheDocument();
    expect(screen.getByText("We can't seem to find the page you're looking for.")).toBeInTheDocument();
    expect(screen.getByText('Go Back Home')).toBeInTheDocument();
    expect(screen.getByAltText('404 Illustration')).toBeInTheDocument();
  });

  test('image has correct src', () => {
    render(<NoPage />);
    const image = screen.getByAltText('404 Illustration');
    expect(image).toHaveAttribute('src', 'mocked-wits-image');
  });

  test('home button navigates correctly', () => {
    render(<NoPage />);
    const button = screen.getByText('Go Back Home');
    
    fireEvent.click(button);
    expect(window.location.href).toBe('/');
  });

  test('styled components render with correct styles', () => {
    const { container } = render(<NoPage />);
    
    // Test container styling
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      padding: '2rem'
    });

    // Test image styling
    const image = screen.getByAltText('404 Illustration');
    expect(image).toHaveStyle({
      maxWidth: '50%',
      maxHeight: '50%',
      marginBottom: '2rem'
    });

    // Test button presence and styling
    const button = screen.getByText('Go Back Home');
    expect(button).toHaveStyle({
      backgroundColor: '#333',
      color: '#fff',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.2rem',
      cursor: 'pointer'
    });
  });
});