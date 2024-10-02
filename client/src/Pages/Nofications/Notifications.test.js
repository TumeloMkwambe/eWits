// Notifications.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import Notifications from './Notifications'; // Adjust the import path as necessary
import Sidebar from '../../components/sidebar';

// Mock the Sidebar component
jest.mock('../../components/sidebar', () => () => <div>Mocked Sidebar</div>);

describe('Notifications Component', () => {
    it('renders the sidebar and notifications message', () => {
        render(<Notifications />);

        // Check if the sidebar is rendered
        expect(screen.getByText('Mocked Sidebar')).toBeInTheDocument();

        // Check if the notifications message is rendered
        expect(screen.getByText('Your Notifications here bruv')).toBeInTheDocument();
    });

    it('has the correct class name for the container', () => {
        const { container } = render(<Notifications />);
        
        // Check if the container has the correct class name
        expect(container.firstChild).toHaveClass('DashboardContainer');
        
        // Check if the content area has the correct class name
        const contentArea = container.querySelector('.ContentArea');
        expect(contentArea).toBeInTheDocument();
    });
});
