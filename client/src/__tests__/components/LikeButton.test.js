import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LikeButton from '../../components/likeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Mock FontAwesomeIcon
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => <div data-testid="mock-icon" />)
}));

describe('LikeButton Component', () => {
  beforeEach(() => {
    FontAwesomeIcon.mockClear();
  });

  test('renders heart icon', () => {
    const { getByTestId } = render(<LikeButton eventID="123" />);
    expect(getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('toggles liked state on click', () => {
    const { getByTestId } = render(<LikeButton eventID="123" />);
    const icon = getByTestId('mock-icon');

    fireEvent.click(icon);
    expect(FontAwesomeIcon).toHaveBeenLastCalledWith(
      expect.objectContaining({
        className: expect.stringContaining('liked')
      }),
      {}
    );

    fireEvent.click(icon);
    expect(FontAwesomeIcon).toHaveBeenLastCalledWith(
      expect.objectContaining({
        className: expect.not.stringContaining('liked')
      }),
      {}
    );
  });
});