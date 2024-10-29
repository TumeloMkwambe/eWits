import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../../Pages/Landing/Landing';
import LandingEvents from '../../components/landingEvents';

// Mock all required components and images
jest.mock('../../components/login', () => {
  return function MockLogin() {
    return <div data-testid="mock-login">Login</div>;
  };
});

jest.mock('../../components/landingEvents', () => {
  return jest.fn(() => [
    {
      id: 1,
      img: 'test-image-1.jpg',
      topic: 'Test Event 1',
      location: 'Location 1',
      date: '2024-01-01'
    },
    {
      id: 2,
      img: 'test-image-2.jpg',
      topic: 'Test Event 2',
      location: 'Location 2',
      date: '2024-01-02'
    }
  ]);
});

// Mock images
jest.mock('../../images/FacebookIcon.png', () => 'facebook-icon');
jest.mock('../../images/InstagramIcon.jpeg', () => 'instagram-icon');
jest.mock('../../images/xIcon.png', () => 'x-icon');
jest.mock('../../images/LinkedInIcon.png', () => 'linkedin-icon');
jest.mock('../../images/YouTubeIcon.png', () => 'youtube-icon');
jest.mock('../../images/WSS.png', () => 'wss-image');
jest.mock('../../images/GreatHall.png', () => 'great-hall-image');
jest.mock('../../images/eWits.png', () => 'ewits-logo');

describe('Landing Page', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('renders header with all navigation elements', () => {
    renderWithRouter(<LandingPage />);
    
    expect(screen.getByAltText('App Logo')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByTestId('mock-login')).toBeInTheDocument();
  });

  test('renders main content sections', () => {
    renderWithRouter(<LandingPage />);
    
    expect(screen.getByText('eWits Takes The Edge Off!')).toBeInTheDocument();
    expect(screen.getByText('Brand Manifesto')).toBeInTheDocument();
    expect(screen.getByText('Our Purpose')).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
  });

  test('renders event carousel with mock events', () => {
    renderWithRouter(<LandingPage />);
    
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Location 2')).toBeInTheDocument();
  });

  test('renders footer with all sections', () => {
    renderWithRouter(<LandingPage />);
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Find Us')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Connect With Us')).toBeInTheDocument();
  });

  test('renders all social media links', () => {
    renderWithRouter(<LandingPage />);
    
    const socialLinks = screen.getAllByRole('link');
    const socialPlatforms = ['Facebook', 'X', 'Instagram', 'LinkedIn', 'YouTube'];
    
    socialPlatforms.forEach(platform => {
      expect(screen.getByAltText(platform)).toBeInTheDocument();
    });
  });

  test('renders virtual tour section', () => {
    renderWithRouter(<LandingPage />);
    
    const tourImage = screen.getByAltText('Description of image');
    expect(tourImage).toBeInTheDocument();
    expect(screen.getByText('Click for tour')).toBeInTheDocument();
  });

  test('copyright notice is present', () => {
    renderWithRouter(<LandingPage />);
    
    expect(screen.getByText(/© 2024 eWits. All rights reserved./)).toBeInTheDocument();
  });
});