import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext(undefined);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: null,
    minPrice: null,
    maxPrice: null,
  });
  const [sortBy, setSortBy] = useState(null);

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <FilterContext.Provider value={{ filters, sortBy, setFilters: updateFilters, setSortBy }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
