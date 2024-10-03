import { Stack, Typography } from "@mui/material";
import {
  CommonModal,
  CustomRadioGroup,
  IconLabelValueField,
} from "@myCash/common";
import { Story } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface InvoiceTypeModalProps {
  open: boolean;
  handleClose: () => void;
  invoiceType: number;
  updateHandler: (
    value: { [key: string]: string },
    type: "settings" | "values"
  ) => void;
}

export const InvoiceTypeModal: React.FC<InvoiceTypeModalProps> = ({
  open,
  handleClose,
  invoiceType,
  updateHandler,
}) => {
  const [value, setValue] = useState(
    invoiceType ? invoiceType.toLocaleString() : "1"
  );
  const { t } = useTranslation();
  const handleConfirm = () => {
    // dispatch(setInvoiceType(value));
    updateHandler({ type: value, active: "1" }, "values");
    handleClose();
  };
  return (
    <CommonModal
      hasActions
      open={open}
      handleClose={handleClose}
      title="settings.invoiceType"
      handleConfirm={handleConfirm}
    >
      <Stack className="invoice-type-modal">
        <IconLabelValueField
          label="settings.invoiceTypeHeader"
          icon={<Story color="#232773" size={24} />}
        />
        <Typography variant="h6" color={"#2D2D2D99"}>
          {t("settings.chooseType")}
        </Typography>
        <CustomRadioGroup
          handleChange={(e) => setValue(e.target.value)}
          inputs={[
            { label: t("invoice.taxInvoice"), value: "2" },
            { label: t("invoice.simpleInvoice"), value: "1" },
          ]}
          value={value}
        />
      </Stack>
    </CommonModal>
  );
};
