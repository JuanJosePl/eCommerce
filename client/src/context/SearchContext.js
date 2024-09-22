import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = async (term) => {
    setSearchTerm(term);
    // Aquí iría la lógica para buscar en tu API
    const results = await fetch(`/api/search?term=${term}`).then((res) =>
      res.json()
    );
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, searchResults, performSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
