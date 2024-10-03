import { Stack, Typography } from "@mui/material";
import {
  PaymentSummary,
  PaymentSummaryItem,
  TablePaymentCompleted,
} from "@myCash/common";
import { useTranslation } from "react-i18next";

interface InvoicePaymentSummaryProps {}

export const InvoicePaymentSummary: React.FC<
  InvoicePaymentSummaryProps
> = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction={"row"} className="payment-summary-header">
        <Typography variant="h5" color={"#2D2D2D99"}>
          {t("invoice.summaryTitle")}
        </Typography>
        <TablePaymentCompleted />
      </Stack>
      <PaymentSummary
        payments={{
          finalTotal: 0,
          total: 0,
          totalAfterTax: 0,
          totalDiscount: 0,
        }}
      >
        <PaymentSummaryItem
          firstItem={{ title: "paymentInvoice.cashTotal", quantity: `200 ر.س` }}
        />
      </PaymentSummary>
    </>
  );
};
