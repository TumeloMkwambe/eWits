import React from 'react';
import { render } from '@testing-library/react';
import NoPage from '../../Pages/NoPage/NoPage';
import renderer from 'react-test-renderer';

// Mock the image import
jest.mock('../../images/wits.png', () => 'mocked-wits-image');

describe('NoPage Component Snapshots', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<NoPage />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with different window sizes', () => {
    // Mock different viewport sizes
    global.innerWidth = 768;
    const mobiletree = renderer
      .create(<NoPage />)
      .toJSON();
    expect(mobiletree).toMatchSnapshot('mobile view');

    global.innerWidth = 1024;
    const desktopTree = renderer
      .create(<NoPage />)
      .toJSON();
    expect(desktopTree).toMatchSnapshot('desktop view');
  });
});