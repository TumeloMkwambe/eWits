// src/components/NoPage.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NoPage from './NoPage';
import '@testing-library/jest-dom'; // Import jest-dom for extended matchers
import witsImage from '../../images/wits.png'; // Import the image path for testing

describe('NoPage Component', () => {
    test('renders correctly with all elements', () => {
        const { getByAltText, getByText } = render(<NoPage />);

        // Check if the image is rendered correctly
        const image = getByAltText('404 Illustration');
        expect(image).toBeInTheDocument();
        expect(image.src).toContain('wits.png'); // Use toContain since src is absolute

        // Check if the title is rendered
        const title = getByText("Oops! Page Not Found");
        expect(title).toBeInTheDocument();

        // Check if the subtitle is rendered
        const subtitle = getByText("We can't seem to find the page you're looking for.");
        expect(subtitle).toBeInTheDocument();

        // Check if the button is rendered
        const button = getByText('Go Back Home');
        expect(button).toBeInTheDocument();
    });

    test('button redirects to home page on click', () => {
        const { getByText } = render(<NoPage />);

        // Mock window.location.href to simulate navigation
        delete window.location;
        window.location = { href: '' }; // Reset href to a blank string for testing

        const button = getByText('Go Back Home');
        fireEvent.click(button);

        expect(window.location.href).toBe('http://localhost/'); // Check if the URL was changed correctly
    });
});
