import { Stack } from "@mui/material";
import { CommonModal } from "@myCash/common";
import { DatePicker } from "../form";
import { t } from "i18next";
import { useState } from "react";
import { format } from "date-fns";

interface ReportsFilterModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ReportsFilterModal: React.FC<ReportsFilterModalProps> = ({
  open,
  handleClose,
}) => {
  const [filters, setFilters] = useState({
    date_from: "",
    date_to: "",
  });

  const handleConfirmFilters = () => {
    handleClose();
  };

  const handleCancelClientsFilters = () => {
    setFilters({ date_from: "", date_to: "" });
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
      handleConfirm={handleConfirmFilters}
      handleClose={handleClose}
      handleCancel={handleClose}
      handleBackBtn={handleCancelClientsFilters}
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
