import { CommonModal, CustomSelect } from "@myCash/common";
import { FormControl, FormLabel, RadioGroup, Stack } from "@mui/material";
import {
  RootState,
  handleSubmitReceiptsFilters,
  resetReceiptsFilters,
} from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "../form/DatePicker";
import { format } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FilterModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ReceiptFilterModal: React.FC<FilterModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const receiptState = useSelector((state: RootState) => state.receipt);
  const [filters, setFilters] = useState({
    date_from: receiptState.filters.date_from,
    date_to: receiptState.filters.date_to,
    paymentStatus: receiptState.filters.paymentStatus,
  });
  const dispatch = useDispatch();

  const handleConfirmClientsFilters = () => {
    dispatch(handleSubmitReceiptsFilters(filters));
    handleClose();
  };

  const handleCancelClientsFilters = () => {
    setFilters({ date_from: "", date_to: "", paymentStatus: "" });
    dispatch(resetReceiptsFilters());
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
              checked={filters.paymentStatus === "1"}
              label={t("receipt.paid")}
              handleChange={(_e, checked) =>
                setFilters({ ...filters, paymentStatus: checked ? "1" : "" })
              }
            />
            <CustomSelect
              checked={filters.paymentStatus === "2"}
              value={"2"}
              label={t("receipt.notPaid")}
              handleChange={(_e, checked) =>
                setFilters({ ...filters, paymentStatus: checked ? "2" : "" })
              }
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </CommonModal>
  );
};
