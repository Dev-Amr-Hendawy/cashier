
import { PaymentSummaryContainer } from "./styles";
import { ReactNode } from "react";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IconLabelValueField } from "../iconLabelValueField";
import { Calendar2, CardTick, Clock, MoneyTime, ReceiptText, TickCircle } from "iconsax-react";
import { calculateProductPaymentNotification, formatMoney } from "@myCash/utils";
import { IInvoiceNotification } from "@myCash/types";

interface PaymentNotificationSummaryProps {
  children?: ReactNode;
  invoice?:IInvoiceNotification|null ;
}

export const PaymentNotificationSummary: React.FC<PaymentNotificationSummaryProps> = ({
  children,invoice
}) => {
  const { t } = useTranslation();
if(!invoice) return;
  const { totalPrice } = calculateProductPaymentNotification(invoice.products)
  return (
    <PaymentSummaryContainer>

      <Stack className="has-border items">
        <IconLabelValueField
          label={t("invoice.invoiceNo")}
          icon={<ReceiptText size="24" />}
          value={` ${invoice.invoiceNumber} #`}
        />
        <IconLabelValueField
          label={t("timing")}
          icon={<Clock size="24" />}
          value={` ${invoice?.date} `}
        />   <IconLabelValueField
          label={t("expenses.totalAmount")}
          icon={<CardTick size="24" />}
          value={formatMoney(String(totalPrice+Number(invoice?.totalPrice)))}
        />
      </Stack>

      <Stack className="has-border items color-secondary">
        <IconLabelValueField
          label={t("receipt.paid")}
          icon={<TickCircle size="24" color="var(--secondary-main)"  />}
          value={formatMoney(String(totalPrice))}
        />
        
      </Stack>
      <Stack className="has-border items">
      <IconLabelValueField
          label={t("client.dueAmount")}
          icon={<MoneyTime size="24" />}
          value={` ${invoice?.totalPrice} `}
        />  
         <IconLabelValueField
          label={t("paymentInvoice.paymentDate")}
          icon={<Calendar2 size="24" />}
          value={` ${new Date().toLocaleDateString()} `}
        /> 
      </Stack>
      
      {children && children}
     
    </PaymentSummaryContainer>
  );
};
