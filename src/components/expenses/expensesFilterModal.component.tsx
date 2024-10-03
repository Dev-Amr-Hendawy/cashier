import { CommonModal } from "@myCash/common";
import DatePicker from "../form/DatePicker";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, resetExpensesFilter, setExpensesFilter } from "@myCash/lib";
import { useState } from "react";
import { format } from "date-fns";

interface ExpensesFilterModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ExpensesFilterModal: React.FC<ExpensesFilterModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const expenseState = useSelector((state: RootState) => state.expense);
  const [filters, setFilters] = useState({
    date_from: expenseState.date_from,
    date_to: expenseState.date_to,
  });
  const dispatch = useDispatch();
  const handleConfirmExpensesFilters = () => {
    dispatch(setExpensesFilter(filters));
    handleClose();
  };

  const handleCancelExpensesFilters = () => {
    setFilters({ date_from: "", date_to: "" });
    dispatch(resetExpensesFilter());
    handleClose();
  };
  const handleDateFrom = (date: Date | null) => {
    setFilters({
      ...filters,
      date_from: date ? format(date, "yyyy-MM-dd") : "",
    });
  };
  const handleDateTo = (date: Date | null) => {
    setFilters({ ...filters, date_to: date ? format(date, "yyyy-MM-dd") : "" });
  };
  return (
    <CommonModal
      open={open}
      hasActions
      title="التصنيف"
      handleConfirm={handleConfirmExpensesFilters}
      handleClose={handleClose}
      handleCancel={handleClose}
      handleBackBtn={handleCancelExpensesFilters}
    >
      <Stack direction="row" justifyContent="space-between" spacing={1.5}>
        <DatePicker
          onChange={handleDateFrom}
          title={t("from")}
          value={filters.date_from ? new Date(filters.date_from) : undefined}
        />
        <DatePicker
          onChange={handleDateTo}
          title={t("to")}
          value={filters.date_to ? new Date(filters.date_to) : undefined}
        />
      </Stack>
    </CommonModal>
  );
};
