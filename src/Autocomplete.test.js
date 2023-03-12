import React from "react";
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { fetchSuggestions, fetchProductDetail } from "./utils/api";

import Autocomplete from "./Autocomplete";

jest.mock("./utils/api", () => ({
    fetchSuggestions: jest.fn(),
    fetchProductDetail: jest.fn(),
}));

describe("Autocomplete", () => {
  it("renders correctly", () => {
    render(<Autocomplete />);

    const autocomplete = document.querySelector('.autocomplete-container');
    
    expect(autocomplete).toBeInTheDocument();
  });

  it("renders the search field", () => {
    render(<Autocomplete />);

    const input = screen.getByRole('textbox');
    
    expect(input).toBeInTheDocument();
  });

  it("renders search results when a valid value is entered", async () => {
    fetchSuggestions.mockResolvedValueOnce([{ id: 1, title: "Shirt" }]);

    render(<Autocomplete />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'shirt');

    await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
  });

  it("renders no more than 10 results", async () => {
    fetchSuggestions.mockResolvedValueOnce([
      { id: 1, title: "Shirt 1" }, 
      { id: 2, title: "Shirt 2" }, 
      { id: 3, title: "Shirt 3" }, 
      { id: 4, title: "Shirt 4" }, 
      { id: 5, title: "Shirt 5" }, 
      { id: 6, title: "Shirt 6" }, 
      { id: 7, title: "Shirt 7" }, 
      { id: 8, title: "Shirt 8" }, 
      { id: 9, title: "Shirt 9" }, 
      { id: 10, title: "Shirt 10" },
      { id: 11, title: "Shirt 11" }, 
      { id: 12, title: "Shirt 12"}
    ]);

    render(<Autocomplete />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'shirt');

    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(10));
  });

  it("renders a product detail card when a search result is clicked", async () => {
    fetchSuggestions.mockResolvedValueOnce([{ id: 2, title: "Mens Casual Premium Slim Fit T-Shirts " }]);

    const productDetails = {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    }

    fetchProductDetail.mockResolvedValueOnce(productDetails);

    render(<Autocomplete />);

    const input = screen.getByRole('textbox')
    
    await userEvent.type(input, 'shirt');

    const button = await waitFor(() => screen.getByRole('button'));

    await userEvent.click(button);

    await waitFor(() => expect(screen.getByText(/Slim-fitting/i)).toBeInTheDocument());
  });

  it("clears the search term and results when a search result is clicked", async () => {
    fetchSuggestions.mockResolvedValueOnce([{ id: 2, title: "Mens Casual Premium Slim Fit T-Shirts " }]);

    const productDetails = {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    }

    fetchProductDetail.mockResolvedValueOnce(productDetails);

    render(<Autocomplete />);

    const input = screen.getByRole('textbox')
    
    await userEvent.type(input, 'shirt');

    const button = await waitFor(() => screen.getByRole('button'));

    await userEvent.click(button);

    await waitFor(() => expect(screen.getByText(/Slim-fitting/i)).toBeInTheDocument());

    expect(input.value).toEqual("");

    expect(button).not.toBeInTheDocument();
  });
});
