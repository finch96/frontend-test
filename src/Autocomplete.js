import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

import ProductDetail from "./ProductDetail";

function Autocomplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if(searchTerm !== "") {
      const timeoutId = setTimeout(function() {
        fetchSuggestions(searchTerm).then((_suggestions) =>
          setSuggestions(_suggestions)
        );
      }, 500);

      return () => clearTimeout(timeoutId);
    }
    else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  function selectOption(event) {
    setProductId(event.target.id);
    setSearchTerm("");
  }

  return (
    <div className="autocomplete-container">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          className="search-box"
          placeholder="Search for a product"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {(suggestions.length !== 0) && <div className={`search-results-dropdown ${productId !== null && "truncate-search-results"}`}>
          {suggestions.slice(0, 10).map(suggestion => (
            <button onClick={(event) => selectOption(event)} className="search-result-button" key={suggestion.id} id={suggestion.id}>{suggestion.title}</button>
          ))}
        </div>}
      </div>
      <ProductDetail productId={productId} />
    </div>
  );
}

export default Autocomplete;
