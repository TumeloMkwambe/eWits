import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterEvent from '../../components/RegisterEvent';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock useParams
jest.mock('react-router-dom', () => ({
  useParams: () => ({ eventID: 'test-event-123' })
}));

describe('RegisterEvent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful API response
    axios.post.mockResolvedValue({ data: {} });
  });

  test('renders registration form', () => {
    render(<RegisterEvent />);
    
    expect(screen.getByText('Register for Event')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Student Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    render(<RegisterEvent />);
    
    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');
  });

  test('submits form successfully', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<RegisterEvent />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Full Name'), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText('Student Number'), { 
      target: { value: '12345' } 
    });
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText('Phone'), { 
      target: { value: '1234567890' } 
    });

    // Submit form
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/events/test-event-123/register'),
        {
          fullName: 'John Doe',
          studentNumber: '12345',
          email: 'john@example.com',
          phone: '1234567890'
        },
        expect.any(Object)
      );
      expect(mockAlert).toHaveBeenCalledWith('Registration successful!');
    });

    mockAlert.mockRestore();
  });

  test('handles submission errors', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    axios.post.mockRejectedValue(new Error('API Error'));
    
    render(<RegisterEvent />);

    // Submit form
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Registration failed. Please try again.');
    });

    mockAlert.mockRestore();
  });

  test('validates required fields', () => {
    render(<RegisterEvent />);
    
    const form = screen.getByText('Register').closest('form');
    const submitButton = screen.getByText('Register');
    
    fireEvent.submit(form);
    
    expect(screen.getByLabelText('Full Name')).toBeRequired();
    expect(screen.getByLabelText('Student Number')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Phone')).toBeRequired();
  });
});