import { Box, Stack, Typography } from "@mui/material";
import { NotificationInvoice } from "@myCash/types";
import { useTranslation } from "react-i18next";
import {
  NotificationInfoProducts,
  NotificationSelectType,
} from "@myCash/components";
import {
  CartSummaryItem,
  PaymentClient,
  // PaymentSummaryItem,
  RecieptHeaderWithTimeBorder,
} from "@myCash/common";

import "./styles.scss";
import { formatMoney } from "@myCash/utils";

interface NotificationMainInfoProps {
  invoice: NotificationInvoice;
  handleDeleteProduct: (id: number) => void;
  handleProductQuantity: (id: number, amount: number) => void;
  handleProductPrice: (id: number, price: number) => void;
  handleInvoiceNotificationSubmit: () => void;
  isSubmitPending?: boolean;
  handleTypeSelect: (type: 1 | 2) => void;
  btnSubmitRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const NotificationMainInfo: React.FC<NotificationMainInfoProps> = ({
  invoice,
  handleDeleteProduct,
  handleProductQuantity,
  handleProductPrice,
  handleInvoiceNotificationSubmit,

  handleTypeSelect,
  btnSubmitRef
}) => {
  const { t } = useTranslation();

  return (
    <Stack className="return-invoice-info">
      <RecieptHeaderWithTimeBorder
        invoiceType
        invoiceNumber={Number(invoice.invoiceNumber)}
        time={invoice.date}
      />

      {invoice?.client && (
        <PaymentClient hideMenu roundedBorders client={invoice.client} />
      )}

      <NotificationInfoProducts
        products={invoice?.products}
        handleProductQuantity={handleProductQuantity}
        handleDeleteProduct={handleDeleteProduct}
        handleProductPrice={handleProductPrice}
      />
      <NotificationSelectType
        handleTypeSelect={handleTypeSelect}
        type={invoice.type}
      />

      <Stack className="card">
        <Typography variant={"h5"} >
          {t("invoice.paymentSummary")}</Typography>

        <CartSummaryItem
          title={t("invoice.summary.titleOne")}
          quantity={formatMoney(String(invoice.totalPrice - invoice.taxPrice))}
        /><CartSummaryItem
          title={t("invoice.summary.titleTwo", {
            tax: Number(invoice.tax),
          })}
          quantity={formatMoney(String(invoice.taxPrice))}
        /><CartSummaryItem
          title={t("paymentInvoice.totalPayment")}
          quantity={formatMoney(String(invoice.totalPrice))}
        />

        <Box display={"none"}>
          <button
            ref={btnSubmitRef}
            onClick={handleInvoiceNotificationSubmit}

          /></Box> </Stack>
    </Stack>
  );
};
