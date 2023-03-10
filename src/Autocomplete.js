import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

function Autocomplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if(searchTerm !== "") {
      fetchSuggestions(searchTerm).then((_suggestions) =>
        setSuggestions(_suggestions)
      );
    }
    else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          className="search-box"
          placeholder="Search for a product"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {(suggestions.length !== 0) && <div className="search-results-dropdown">
          {suggestions.slice(0, 10).map(suggestion => (
            <button className="search-result-button" key={suggestion.id} id={suggestion.id}>{suggestion.title}</button>
          ))}
        </div>}
      </div>
  );
}

export default Autocomplete;
