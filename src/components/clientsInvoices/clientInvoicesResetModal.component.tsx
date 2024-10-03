import { FormControl, FormLabel, RadioGroup, Stack } from "@mui/material";
import { CommonModal, CustomSelect, NativeTextField } from "@myCash/common";
import { useResetInvoiceOrder } from "@myCash/hooks";
import { CommonModalProps } from "@myCash/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface ClientInvoicesResetModalProps extends CommonModalProps {}

export const ClientInvoicesResetModal: React.FC<
  ClientInvoicesResetModalProps
> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [resetFilters, setResetFilters] = useState({
    resetType: "",
    current_invoice_order: "",
  });
  const { mutate, isPending } = useResetInvoiceOrder(handleClose);
  return (
    <CommonModal
      hasActions
      open={open}
      title="invoice.resetInvoiceOrder"
      handleClose={() => {
        handleClose();
        setResetFilters({ resetType: "", current_invoice_order: "" });
      }}
      handleConfirm={() => {
        resetFilters?.resetType
          ? mutate({
              resetType: resetFilters.resetType,
              current_invoice_order: resetFilters.current_invoice_order,
            })
          : toast.error(t("invoice.resetOrderError"), {
              toastId: "reset-invoice-order",
            });
      }}
      loading={isPending}
    >
      <Stack gap={"1.5rem"}>
        <FormControl className="filter-payment-radio">
          <FormLabel>{t("invoice.type")}</FormLabel>
          <RadioGroup color="secondary" value={resetFilters}>
            <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
              <CustomSelect
                value="1"
                checked={resetFilters.resetType === "1"}
                label={t("invoice.filters.buyInvoices")}
                handleChange={(_e) => {
                  setResetFilters((prevState) => ({
                    ...prevState,
                    resetType: _e.target.value || "",
                  }));
                }}
              />
              <CustomSelect
                checked={resetFilters.resetType === "2"}
                value={"2"}
                label={t("invoice.filters.sellInvoices")}
                handleChange={(_e) => {
                  setResetFilters((prevState) => ({
                    ...prevState,
                    resetType: _e.target.value || "",
                  }));
                }}
              />
            </Stack>
          </RadioGroup>
        </FormControl>
        <NativeTextField
          label={t("invoice.invoiceOrder")}
          type="number"
          handleChange={(e) =>
            setResetFilters((prevState) => ({
              ...prevState,
              current_invoice_order: e?.target?.value || "",
            }))
          }
        />
      </Stack>
    </CommonModal>
  );
};
