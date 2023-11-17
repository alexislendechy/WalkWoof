import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
min-width: 66.67%;
max-width: 66.67%;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 14px;
  }

  button {
    background-color: white;
    color: #8a2be2; /* Purple color */
    padding: 8px 12px;
    border: 1px solid #8a2be2;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    background-color: #8a2be2; /* Darker purple */
    color: white;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Pass the search term to the parent component or perform the search logic here
    onSearch(searchTerm);
  };

  return (
    <SearchBarContainer>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </SearchBarContainer>
  );
};

export default SearchBar;