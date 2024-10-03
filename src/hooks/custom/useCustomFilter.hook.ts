import { useState } from "react";

export const useCustomFilter = <T>(
  x: T
): {
  filters: T;
  setFilterHandler: (newFilter: { [K in keyof T]?: T[K] }) => void;
  clearFilters: () => void;
  setFiltersHandler: (newFilters: T) => void;
} => {
  const [filters, setFilters] = useState<T>(x);
  const setFiltersHandler = (newFilters: T) => {
    setFilters((prevFilter) => {
      return { ...prevFilter, ...newFilters };
    });
  };
  const clearFilters = () => {
    setFilters(x);
  };
  const setFilterHandler = (newFilter: { [K in keyof T]?: T[K] }) => {
    setFilters((prevState) => ({ ...prevState, ...newFilter }));
  };
  return { filters, setFilterHandler, clearFilters, setFiltersHandler };
};
