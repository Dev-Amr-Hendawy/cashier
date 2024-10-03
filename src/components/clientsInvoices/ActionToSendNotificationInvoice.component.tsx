import {
  InvoicesSendNotificationsModal,
} from "@myCash/common";
import Button from "@myCash/components/form/Button";
import { InvoiceType } from "@myCash/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ActionToSendNotificationsInvoiceProps {
  invoice:InvoiceType;
}

export const ActionToSendNotificationsInvoice: React.FC<ActionToSendNotificationsInvoiceProps> = ({

  invoice,

}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        text={t("invoiceNotifications.sendNotification")}
            color="primary"
        onClick={handleOpen}
      />

      <InvoicesSendNotificationsModal
        open={open}
        handleClose={handleClose}
        invoice={invoice}

      />
    </>
  );
};
