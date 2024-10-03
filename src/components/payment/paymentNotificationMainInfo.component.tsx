import {  IconLabelValueField, PaymentClient } from "@myCash/common";

import { handleResetInvoiceSendNotificationSlice, IInvoicesSendNotificationState, resetPayments } from "@myCash/lib";
import {  PaymentNotificationFullSummary } from "@myCash/components";
import { Stack } from "@mui/material";
import { Receipt1, TickCircle } from "iconsax-react";
import {  useMakeInvoiceNoteCredit } from "@myCash/hooks";
import { useTranslation } from "react-i18next";
import Button from "../form/Button";
import { useEffect } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


type Props = {
  mainState: IInvoicesSendNotificationState;

};

export const PaymentNotificationMainInfo: React.FC<Props> = ({
  mainState,
 
}) => {
 
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();

    const { handleInvoiceValuesBeforeSubmit, isPendingNotification, isSuccessNotification } = useMakeInvoiceNoteCredit();

  useEffect(() => {
    if (isSuccessNotification) {
     
      dispatch(handleResetInvoiceSendNotificationSlice())
      dispatch(resetPayments())
      // Other success handling logic here
     
        navigate("/invoices")
    
    }
  }, [isSuccessNotification, t]);


  return (
    <Stack
      sx={{
        gridColumn: "1 / 7",
        gridRow: "auto",
        marginTop: ".5rem",
        gap:2
      }}
    >
        <IconLabelValueField
        hasBorder
        label={t("client.receipt")}
        icon={<Receipt1 size="24" />}
      />
      {mainState?.invoice?.client && (
        <PaymentClient hideMenu client={mainState?.invoice?.client} />
      )}
        <PaymentNotificationFullSummary />
      <Button
        text={<><TickCircle size="32" /> {t("confirm")}</>}
        onClick={() => {
          handleInvoiceValuesBeforeSubmit();
        }}
        loading={isPendingNotification}
      />
    </Stack>
  );
};
