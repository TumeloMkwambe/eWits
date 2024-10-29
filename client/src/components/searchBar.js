import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin: 1rem auto;
  max-width: 600px;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchBar = ({ query, setQuery }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchBar;
