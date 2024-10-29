import { screen } from '@testing-library/react';

export const testPageLayout = (container) => {
  // Test basic layout structure
  expect(container.querySelector('.DashboardContainer')).toBeInTheDocument();
  expect(container.querySelector('.ContentArea')).toBeInTheDocument();
  
  // Test sidebar presence
  expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
};

export const testContentAreaOrder = (container, expectedContent) => {
  const contentArea = container.querySelector('.ContentArea');
  expect(contentArea).toHaveTextContent(expectedContent);
};