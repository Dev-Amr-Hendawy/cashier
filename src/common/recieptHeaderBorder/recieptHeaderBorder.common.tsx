import "./styles.scss";

import { Receipt1, ReceiptText } from "iconsax-react";

import { IconLabelValueField } from "..";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RecieptHeaderBorderProps {
  invoiceType?: boolean;
  invoiceNumber?: number;
}

export const RecieptHeaderBorder: React.FC<RecieptHeaderBorderProps> = ({
  invoiceType,
  invoiceNumber,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="container-border-padding reciept-header">
      <IconLabelValueField
        icon={
          invoiceType ? (
            <ReceiptText color="#2D2D2D" />
          ) : (
            <Receipt1 color="#2D2D2D" />
          )
        }
        label={t(invoiceType ? "invoice.title" : "client.receipt")}
        value={invoiceType ? `#${invoiceNumber}` : "#1"}
      />
    </Stack>
  );
};
