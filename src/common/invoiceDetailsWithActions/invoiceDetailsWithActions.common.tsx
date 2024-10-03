import "./styles.scss";

import { Stack, Typography } from "@mui/material";
import { formatMoney, getInvoicePaymentType } from "@myCash/utils";

import Button from "@myCash/components/form/Button";
import { InvoiceType } from "@myCash/types";
import { PAYMENT_STATUS } from "@myCash/constants";
import arrowRight from "../../assets/icons/arrow-circle-right.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type InvoiceDetailsWithActionsProps = {
  invoice: InvoiceType;
};

export const InvoiceDetailsWithActions: React.FC<
  InvoiceDetailsWithActionsProps
> = ({ invoice }) => {
  const { t } = useTranslation();
  // const cartState = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const handleReturnInvoice = () => {
    navigate(`/invoices/return-invoice/${invoice.id}`);
  };
  const handlePayInvoice = () => {
    navigate(`/invoices/pay/${invoice.id}`);
  };
  const handleSendNotification = () => {
    navigate(`/send-invoice-notifications/${invoice.id}`);
  };
  return (
    <div className="invoice-details-actions">
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        className="header"
      >
        <Typography color="grey.900" variant="h5">
          {t("invoice.summaryTitle")}
        </Typography>
        {invoice.paymentStatus == PAYMENT_STATUS.NOT_PAID && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography color="primary.main" variant="h5">
              {t("invoice.notPaid")}
            </Typography>
            <img
              src={arrowRight}
              alt="arrow-right"
              className="arrow-right-icon"
            />
          </Stack>
        )}
      </Stack>
      <Stack className="summary-container" spacing={1}>
        <SummaryItem
          title={t("invoice.invoiceNo")}
          value={`#${invoice.invoiceNumber}`}
        />
        <SummaryItem
          title={t("invoice.invoiceOrder")}
          value={`#${invoice.invoiceOrder}`}
        />
        <SummaryItem
          title={t("invoice.summary.titleOne")}
          value={formatMoney(invoice.productPrice)}
        />
        <SummaryItem
          title={t("invoice.summary.titleTwo", {
            tax: Number(invoice.tax),
          })}
          value={formatMoney(invoice.taxPrice)}
        />
        <SummaryItem
          title={t("invoice.summary.titleThree")}
          value={formatMoney(invoice.discountPrice)}
        />
        <SummaryItem
          title={t("paymentMethod.title")}
          value={getInvoicePaymentType(invoice.paymentType)}
        />
      </Stack>
      <Stack
        className="summary-title"
        justifyContent="space-between"
        direction="row"
      >
        <Typography variant="h4" color="grey.300">
          {t("invoice.total")}
        </Typography>
        <Typography variant="body1">
          {formatMoney(invoice.totalPrice)}
        </Typography>
      </Stack>
      <Stack className="summary-actions">
        {invoice.paymentStatus == PAYMENT_STATUS.NOT_PAID && (
          <Button
            text={
              t("invoice.payInvoice") + " " + formatMoney(invoice.rammingPrice)
            }
            color="secondary"
            notRounded
            onClick={handlePayInvoice}
          />
        )}
        <Button
          text={t("invoice.returnInvoice")}
          color="primary"
          notRounded
          onClick={handleReturnInvoice}
        />
        <Button
          text={t("invoiceNotifications.sendNotification")}
          color="secondary"
          notRounded
          onClick={handleSendNotification}
        />
      </Stack>
    </div>
  );
};

type itemProps = {
  title: string;
  value: string;
};
const SummaryItem: React.FC<itemProps> = ({ title, value }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      className="summary-item"
    >
      <Typography variant="h6" color="grey.300">
        {title}
      </Typography>
      <Typography color="grey.900" variant="body2">
        {value}
      </Typography>
    </Stack>
  );
};
