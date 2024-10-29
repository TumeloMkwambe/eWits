import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../components/searchBar';

describe('SearchBar Component', () => {
  const mockSetQuery = jest.fn();

  test('renders search input', () => {
    render(<SearchBar query="" setQuery={mockSetQuery} />);
    const searchInput = screen.getByPlaceholderText('Search for events...');
    expect(searchInput).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<SearchBar query="" setQuery={mockSetQuery} />);
    const searchInput = screen.getByPlaceholderText('Search for events...');
    
    fireEvent.change(searchInput, { target: { value: 'test event' } });
    expect(mockSetQuery).toHaveBeenCalledWith('test event');
  });

  test('displays current query value', () => {
    const currentQuery = 'current search';
    render(<SearchBar query={currentQuery} setQuery={mockSetQuery} />);
    const searchInput = screen.getByPlaceholderText('Search for events...');
    
    expect(searchInput).toHaveValue(currentQuery);
  });
});