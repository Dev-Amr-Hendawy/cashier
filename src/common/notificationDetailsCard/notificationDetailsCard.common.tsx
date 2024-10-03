import {  Stack, Typography } from "@mui/material";
import { NotificationCardAppendix } from "..";
import { MoneyChange } from "iconsax-react";
import "./styles.scss";
import { IInvoiceNotification } from "@myCash/types";
import { useTranslation } from "react-i18next";
import { INVOICES_NOTIFICATIONS_TYPE, PAYMENT_STATUS } from "@myCash/constants";

interface NotificationDetailsCardProps {
  invoice?: IInvoiceNotification;
  isSelected?: boolean;
  rowClickHandler: (data: IInvoiceNotification) => void;
}

export const NotificationDetailsCard: React.FC<NotificationDetailsCardProps> = ({
  invoice,
  isSelected,
  rowClickHandler,
}) => {
  const { t } = useTranslation();

  if (!invoice) {
    return null; // or you can return some placeholder UI if invoice is undefined
  }

  return (
    <Stack
      className="notification-details-card"
      onClick={() => rowClickHandler(invoice)}
      sx={{ border: isSelected ? "3px solid var(--primary-main)" : "none" }}
    >
      <Stack
        direction="column"
        spacing={2}
        className="notification-details-card-header"
      >
        <Stack direction="row" spacing={4} justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <MoneyChange size="32" color="var(--primary-main)" />
            <Stack direction="column" spacing={1}>
              <Typography variant="h6">
                {invoice.type === INVOICES_NOTIFICATIONS_TYPE.CREDITOR
                  ? t("creditorInvoice")
                  : t("debtorInvoice")}
              </Typography>
              <Typography variant="h6">
                x {invoice.products.length} {t("client.product")}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="h6" dir="ltr"># {invoice.id}</Typography>
        </Stack>

        <Typography variant="h6" textAlign="end">
          {invoice.date}
        </Typography>
      </Stack>
      <NotificationCardAppendix
        value={invoice?.totalPrice}
        isCompleted={invoice.invoice.paymentStatus === PAYMENT_STATUS.PAID}
      />
    </Stack>
  );
};
