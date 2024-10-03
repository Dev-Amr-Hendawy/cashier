import { format } from "date-fns";
import { useState } from "react";

export const useDatePickerHandler = () => {
  const [filters, setFilters] = useState({
    date_from: "",
    date_to: "",
   
  });
  const handleDateFrom = (date: Date | null) => {
    setFilters({
      ...filters,
      date_from: date ? format(date, "yyyy-MM-dd") : "",
    });
  };
  const handleDateTo = (date: Date | null) => {
    setFilters({ ...filters, date_to: date ? format(date, "yyyy-MM-dd") : "" });
  };
  const handleResetDateFilters = () => {
    setFilters({ date_from: "", date_to: "" });
  };
  const setDateFilters = ({
    date_from,
    date_to,
  }: {
    date_from?: string;
    date_to?: string;
  }) => {
    setFilters({
      date_from: date_from ? date_from : filters.date_from,
      date_to: date_to ? date_to : filters.date_to,
    });
  };
  return {
    filters,
    handleDateFrom,
    handleDateTo,
    handleResetDateFilters,
    setDateFilters,
  };
};
