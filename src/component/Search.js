import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/profile/', {
        word: searchQuery,
      });
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error generating profiles:', error);
    }
  };

  return (
    <div>
      <div className="options">
        <Link to="/generate">
          <button>Go to Generate</button>
        </Link>
        <Link to="/">
          <button>Go to Home</button>
        </Link>
        <input
          type="text"
          placeholder="Enter search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search_results">
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((result) => (
            <li className="results" key={result.id}>
              <h4>{result.name}</h4>
              <h4>{result.address}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
