import { Typography } from "@mui/material";
import { InvoiceSettingItem } from "@myCash/common";
import { ReceiptDiscount } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InvoiceTypeModal } from "@myCash/components";
import { INVOICE_TYPE } from "@myCash/constants";

interface InvoiceTypeProps {
  invoiceType: number;
  updateHandler: (
    value: { [key: string]: string },
    type: "settings" | "values"
  ) => void;
}

export const InvoiceType: React.FC<InvoiceTypeProps> = ({
  invoiceType,
  updateHandler,
}) => {
  const { t } = useTranslation();
  const [typeOpen, setTypeOpen] = useState(false);
  return (
    <>
      <Typography variant="h4">{t("settings.invoiceType")}</Typography>
      <InvoiceSettingItem
        icon={<ReceiptDiscount size={24} />}
        hasArrow
        name={
          invoiceType === INVOICE_TYPE.SIMPLE
            ? t("invoice.simpleInvoice")
            : t("invoice.taxInvoice")
        }
        onClick={() => setTypeOpen(true)}
      />
      <InvoiceTypeModal
        open={typeOpen}
        handleClose={() => setTypeOpen(false)}
        invoiceType={invoiceType}
        updateHandler={updateHandler}
      />
    </>
  );
};
