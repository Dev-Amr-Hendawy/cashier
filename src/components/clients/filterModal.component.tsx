import { FormControl, FormLabel, RadioGroup, Stack } from "@mui/material";
import { CommonModal, CustomSelect } from "@myCash/common";
import { RootState, resetClientsFilter, setClientsFilter } from "@myCash/lib";
import { format } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../form/DatePicker";

interface FilterModalProps {
  open: boolean;
  handleClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const clientsState = useSelector((state: RootState) => state.client);
  const [filters, setFilters] = useState({
    date_from: clientsState.date_from,
    date_to: clientsState.date_to,
    invoice_paid: clientsState.invoice_paid,
  });
  const dispatch = useDispatch();

  const handleConfirmClientsFilters = () => {
    dispatch(setClientsFilter(filters));
    handleClose();
  };

  const handleCancelClientsFilters = () => {
    setFilters({ date_from: "", date_to: "", invoice_paid: "" });
    dispatch(resetClientsFilter());
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
      title={t("filter.title")}
      handleConfirm={handleConfirmClientsFilters}
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
      <FormControl className="filter-payment-radio">
        <FormLabel>{t("client.payment")}</FormLabel>
        <RadioGroup color="secondary">
          <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
            <CustomSelect
              value="1"
              checked={filters.invoice_paid === "1"}
              label={t("client.completedInvoices")}
              handleChange={(_e, checked) =>
                setFilters({ ...filters, invoice_paid: checked ? "1" : "" })
              }
            />
            <CustomSelect
              checked={filters.invoice_paid === "2"}
              value={"2"}
              label={t("client.delayedInvoices")}
              handleChange={(_e, checked) =>
                setFilters({ ...filters, invoice_paid: checked ? "2" : "" })
              }
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </CommonModal>
  );
};
