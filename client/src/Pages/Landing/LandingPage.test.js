const React = require('react');
const { render, screen } = require('@testing-library/react');
const LandingPage = require('./Landing').default;
require('@testing-library/jest-dom');

// Mocking LandingEvents outside the test block
jest.mock('../../components/landingEvents', () => () => [
  { id: 1, img: 'event1.png', topic: 'Event 1', location: 'Location 1', date: 'Date 1' },
  { id: 2, img: 'event2.png', topic: 'Event 2', location: 'Location 2', date: 'Date 2' }
]);

describe('LandingPage Component', () => {
  test('renders landing page with all elements', () => {
    render(<LandingPage />);

    // Check if the logo is displayed
    const logo = screen.getByAltText('App Logo');
    expect(logo).toBeInTheDocument();

    // Check if navigation bar links are rendered
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();

    // Check if the brand manifesto and other sections are displayed
    expect(screen.getByText('Brand Manifesto')).toBeInTheDocument();
    expect(screen.getByText('Our Purpose')).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();

    // Check if the contact information is displayed
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('General enquiries')).toBeInTheDocument();
    expect(screen.getByText('Find Us')).toBeInTheDocument();

    // Check if the social media icons are rendered and have correct links
    const facebookLink = screen.getByAltText('Facebook');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink.closest('a')).toHaveAttribute('href', 'https://www.facebook.com/witsuniversity');

    const instagramLink = screen.getByAltText('Instagram');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink.closest('a')).toHaveAttribute('href', 'https://www.instagram.com/wits__university/');

    const linkedinLink = screen.getByAltText('LinkedIn');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/school/university-of-the-witwatersrand/posts/?feedView=all');

    const youtubeLink = screen.getByAltText('YouTube');
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink.closest('a')).toHaveAttribute('href', 'https://www.youtube.com/user/WitsWebmaster');
  });

  test('renders carousel with event items', () => {
    render(<LandingPage />);

    // Check if the carousel items are rendered correctly
    const mockEvents = [
      { id: 1, img: 'event1.png', topic: 'Event 1', location: 'Location 1', date: 'Date 1' },
      { id: 2, img: 'event2.png', topic: 'Event 2', location: 'Location 2', date: 'Date 2' }
    ];

    mockEvents.forEach(event => {
      expect(screen.getByAltText(`Event ${event.id}`)).toBeInTheDocument();
      expect(screen.getByText(event.topic)).toBeInTheDocument();
      expect(screen.getByText(event.location)).toBeInTheDocument();
      expect(screen.getByText(event.date)).toBeInTheDocument();
    });
  });
});
