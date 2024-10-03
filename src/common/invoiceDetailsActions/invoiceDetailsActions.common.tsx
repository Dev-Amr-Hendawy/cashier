import "./styles.scss";

import { Box, Stack } from "@mui/material";
import { formatMoney } from "@myCash/utils";

import Button from "@myCash/components/form/Button";
import { InvoiceType } from "@myCash/types";
import { PAYMENT_STATUS } from "@myCash/constants";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ActionToReturnInvoice, ActionToSendNotificationsInvoice } from "@myCash/components";
import { Eye } from "iconsax-react";
import { setInvoiceId } from "@myCash/lib";
import { useDispatch } from "react-redux";

type InvoiceDetailsActionsProps = {
  invoice: InvoiceType;
};

export const InvoiceDetailsActions: React.FC<InvoiceDetailsActionsProps> = ({
  invoice,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const handlePayInvoice = () => {
    navigate(`/invoices/pay/${invoice.id}`);
  };
  const handleShowNotificationInvoice = () => {
    navigate(`/invoice-notification-details/${invoice.id}`);
  };

  const handleShowInvoice = () => {
    dispatch(setInvoiceId(invoice.child_invoice_id))
 
  };
const HaveAllNotification=invoice.products.every(product=>product.hasNotification===1)
const HaveAllQuantity=invoice.products.some(product=>Number(product.quantity) >0 )
  return  HaveAllQuantity&&(
    <Stack className="summary-actions">
      {invoice.paymentStatus == PAYMENT_STATUS.NOT_PAID && (
        <Button
          text={
            t("invoice.payInvoice") + " " + formatMoney(invoice.rammingPrice)
          }
          color="primary"
          onClick={handlePayInvoice}
        />
      )}
      {invoice?.isReturn !== 1 ? (
        <ActionToReturnInvoice invoice={invoice} />
      ) : (
       
          <Button
            text={<Box  alignItems={"center"} display={"flex"} justifyContent={"space-around"} gap={1} > <Eye /> {t("invoice.viewNewInvoice")}</Box>}
            color="primary"
           
            onClick={handleShowInvoice}
          />
      
      )}
      {invoice?.hasInvoiceNotification == 1 ? (
        <>
          {invoice?.isReturn !== 1 &&!HaveAllNotification &&(<ActionToSendNotificationsInvoice invoice={invoice} />)}

          <Button
            text={<Box  alignItems={"center"} display={"flex"} justifyContent={"space-around"} gap={1} ><Eye /> {t("notifications.view")} </Box>}
            color="primary"
            variant="outlined"
            onClick={handleShowNotificationInvoice}
          />
        </>
      ) :
        invoice?.isReturn !== 1 &&!HaveAllNotification && (<ActionToSendNotificationsInvoice invoice={invoice} />
        )}
    </Stack>
  );
};
