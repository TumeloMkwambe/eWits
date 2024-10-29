import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

// Add a test to satisfy Jest
describe('Test Utils', () => {
  test('custom render works', () => {
    const TestComponent = () => <div>Test</div>;
    customRender(<TestComponent />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});