import React from "react";

import "./App.css";

import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

function App() {
  return (
    <div className="App">
      <Autocomplete />
      <ProductDetail productId={null} />
    </div>
  );
}

export default App;
