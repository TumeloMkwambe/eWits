import React from 'react';
import { render } from '@testing-library/react';
import Notifications from '../../Pages/Notifications/Notifications';
import renderer from 'react-test-renderer';

// Mock the sidebar component
jest.mock('../../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

describe('Notifications Component Snapshots', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<Notifications />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});