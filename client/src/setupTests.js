import '@testing-library/jest-dom/extend-expect'; // Ensure this is imported
import { createRoot } from 'react-dom/client'; // Import createRoot

// If you have a custom render function, set it up like this:
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{ui}</Router>);
};

// Use this renderWithRouter in your tests instead of render
