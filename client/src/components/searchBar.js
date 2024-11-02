// src/components/searchBar.js
import React from 'react';
import '../globals.css';

const SearchBar = ({ setSearchQuery }) => {
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for events..."
                onChange={handleInputChange}
                className="search-bar"
            />
        </div>
    );
};

export default SearchBar;
