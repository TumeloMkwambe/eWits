// src/Pages/Calendar/Calendar.test.js

import React from 'react';
import { render } from '@testing-library/react';
import Calendar from './Calendar';
import '@testing-library/jest-dom'; // Correctly import jest-dom
import Sidebar from '../../components/sidebar';
import EventCalendar from '../../components/eventCalendar';

jest.mock('../../components/sidebar', () => () => <div>Sidebar Component</div>);
jest.mock('../../components/eventCalendar', () => () => <div>Event Calendar Component</div>);

describe('Calendar Component', () => {
    test('renders Sidebar and EventCalendar components', () => {
        const { getByText } = render(<Calendar />);

        // Check if Sidebar component is rendered
        expect(getByText('Sidebar Component')).toBeInTheDocument();

        // Check if EventCalendar component is rendered
        expect(getByText('Event Calendar Component')).toBeInTheDocument();
    });
});
