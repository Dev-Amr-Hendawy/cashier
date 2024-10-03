import { FormControl, FormLabel, RadioGroup, Stack } from "@mui/material";
import { CommonModal, CustomSelect } from "@myCash/common";
import { ModalProps } from "@myCash/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ReportsBuyFilterProps extends ModalProps {
  handleConfirmFilters: (value: string) => void;
  handleCancelFilters: () => void;
}

export const ReportsBuyFilter: React.FC<ReportsBuyFilterProps> = ({
  open,
  handleClose,
  handleConfirmFilters,
  handleCancelFilters,
}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    invoiceTaxType: "",
  });
  return (
    <CommonModal
      open={open}
      hasActions
      title={t("filter.title")}
      handleConfirm={() => {
        handleConfirmFilters(filters.invoiceTaxType);
        handleClose && handleClose();
      }}
      handleClose={handleClose}
      handleCancel={handleClose}
      handleBackBtn={() => {
        handleCancelFilters();
        setFilters({ invoiceTaxType: "" });
      }}
    >
      <FormControl className="filter-payment-radio">
        <FormLabel>{t("settings.invoiceType")}</FormLabel>
        <RadioGroup color="secondary">
          <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
            <CustomSelect
              value="1"
              label={t("invoice.filters.simpleInvoices")}
              checked={filters.invoiceTaxType === "1"}
              handleChange={(_e, checked) =>
                setFilters({ invoiceTaxType: checked ? "1" : "" })
              }
            />
            <CustomSelect
              checked={filters.invoiceTaxType === "2"}
              value={"2"}
              label={t("invoice.filters.taxInvoices")}
              handleChange={(_e, checked) =>
                setFilters({ invoiceTaxType: checked ? "2" : "" })
              }
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </CommonModal>
  );
};
