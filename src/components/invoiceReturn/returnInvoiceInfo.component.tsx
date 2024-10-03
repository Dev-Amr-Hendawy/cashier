import "./styles.scss";

import { Clock } from "iconsax-react";
import {
  EditTable,
  LabelValueFieldWithClient,
  PaymentSummaryItem,
  RecieptHeaderBorder,
} from "@myCash/common";

import { InvoiceType } from "@myCash/types";
import { Stack } from "@mui/material";
import { formatMoney } from "@myCash/utils";
import { useTranslation } from "react-i18next";

interface ReturnInvoiceInfoProps {
  invoice: InvoiceType;
}

export const ReturnInvoiceInfo: React.FC<ReturnInvoiceInfoProps> = ({
  invoice,
}) => {
  const { t } = useTranslation();

  return (
    <Stack className="return-invoice-info">
      <RecieptHeaderBorder invoiceType invoiceNumber={invoice.invoiceNumber} />

      <LabelValueFieldWithClient
        label="timing"
        invoice={invoice}
        icon={<Clock size={24} color="#2D2D2D" />}
        value={invoice.date}
        hasBorder
      />

      {/* TODO:: add table here nemoo */}
      <EditTable products={invoice?.products} />
      <PaymentSummaryItem
        firstItem={{
          title: t("invoice.summary.titleOne"),
          quantity: formatMoney(
            String(Number(invoice.productPrice) - Number(invoice.discountPrice))
          ),
        }}
        secondItem={{
          title: t("invoice.summary.titleTwo", {
            // tax: cartState?.taxPercentage * 100,
            tax: Number(invoice.tax),
          }),
          quantity: formatMoney(invoice.taxPrice),
        }}
        roundedBorders
      />
      <PaymentSummaryItem
        firstItem={{
          title: t("paymentInvoice.cashTotal"),
          quantity: formatMoney(invoice.totalPrice),
        }}
        roundedBorders
      />
    </Stack>
  );
};
