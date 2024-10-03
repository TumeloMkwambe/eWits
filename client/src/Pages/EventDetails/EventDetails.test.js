import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // Ensure this is imported
import EventDetails from './EventDetails';
import Sidebar from '../../components/sidebar';
import EventDetailsForm from '../../components/eventDetails';

// Mock Sidebar and EventDetailsForm components
jest.mock('../../components/sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('../../components/eventDetails', () => () => <div data-testid="event-details-form" />);

describe('EventDetails Component', () => {
  test('renders Sidebar and EventDetailsForm', () => {
    // Render the EventDetails component
    render(<EventDetails />);

    // Assert that Sidebar is rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    // Assert that EventDetailsForm is rendered
    expect(screen.getByTestId('event-details-form')).toBeInTheDocument();

    // Assert that the container elements are rendered correctly
    expect(screen.getByRole('region', { name: 'DashboardContainer' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'ContentArea' })).toBeInTheDocument();
  });
});
