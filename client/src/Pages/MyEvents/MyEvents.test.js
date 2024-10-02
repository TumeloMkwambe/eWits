// MyEvents.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Correct import for jest-dom
import MyEvents from './MyEvents';  // Adjust the import path as necessary
import CreatedEvents from '../../components/createdEvent';
import Sidebar from '../../components/sidebar';

// Mock the imported components
jest.mock('../../components/createdEvent', () => () => <div>Mocked Created Events</div>);
jest.mock('../../components/sidebar', () => () => <div>Mocked Sidebar</div>);

describe('MyEvents Component', () => {
    it('renders the sidebar and created events', () => {
        render(<MyEvents />);

        // Check if the sidebar is rendered
        expect(screen.getByText('Mocked Sidebar')).toBeInTheDocument();

        // Check if the title is rendered
        expect(screen.getByText('Created Events')).toBeInTheDocument();

        // Check if the created events are rendered
        expect(screen.getByText('Mocked Created Events')).toBeInTheDocument();
    });

    it('has the correct class names', () => {
        const { container } = render(<MyEvents />);
        
        // Check if the container has the correct class name
        expect(container.firstChild).toHaveClass('DashboardContainer');

        // Check if the content area has the correct class name
        const contentArea = container.querySelector('.ContentArea');
        expect(contentArea).toBeInTheDocument();
        
        // Check if the main content area has the correct class name
        const mainContent = contentArea.querySelector('.main-content');
        expect(mainContent).toBeInTheDocument();
        
        // Check if the past events container has the correct class name
        const pastEventsContainer = mainContent.querySelector('.past-events-container');
        expect(pastEventsContainer).toBeInTheDocument();
    });
});
