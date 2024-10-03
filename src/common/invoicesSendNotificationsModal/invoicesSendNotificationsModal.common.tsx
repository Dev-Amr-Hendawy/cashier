import { useTranslation } from "react-i18next";
import { MainLoader, ModalInvoice } from "@myCash/common";
import { Stack } from "@mui/material";
import { InvoiceType, NotificationInvoice } from "@myCash/types";
import { InvoiceNotificationSendContent } from "@myCash/components";
import { useGetInvoice } from "@myCash/hooks";
import { useSelector } from "react-redux";
import {useRef } from "react";
import { RootState} from "@myCash/lib";
import { useQueryClient } from "@tanstack/react-query";
import { INVOICES_QUERY_KEY } from "@myCash/constants";
type InvoicesSendNotificationsModalProps = {
  open: boolean;
  handleClose: () => void;
  invoice: InvoiceType;
};

export const InvoicesSendNotificationsModal: React.FC<InvoicesSendNotificationsModalProps> = ({
  open,
  handleClose,
  invoice,
}) => {
  const { t } = useTranslation();
const btnSubmitRef= useRef<HTMLButtonElement | null>(null);
  const invoiceCashID = localStorage.getItem("invoiceCashID") || invoice.id;
  const { data, isPending ,refetch} = useGetInvoice(`${invoiceCashID}` || "");
  const queryClient = useQueryClient();

const handleSubmit=()=>{
  btnSubmitRef.current?.click()
  queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
  refetch()
}
 
  const { user } = useSelector((state: RootState) => state.user);
  const mappedInvoices = data && {
    invoiceId: data.id,
    invoiceNumber: data.invoiceNumber,
    date: data?.date,
    client: data?.client,
    tax: Number(user?.accountInfo?.tax),
    totalPrice: 0,
    taxPrice: 0,
    // TODO:: comment back when payment types fixed from backend and check for payment types cards
    // paymentType: data?.paymentType,
    paymentType: 2,
    paymentTypeSent: null,
    type: 0,
    products: data?.products?.map((product) => {
      return {
        ...product,
        price: product.totalPrice.toLocaleString(),
        quantity: product.quantity.toLocaleString(),
      };
    }),
  };

  if (isPending) return <MainLoader />;
  if (!data || !mappedInvoices) return null;

  return (
    <ModalInvoice
      open={open}
      hasActions={true}
      title={t("Credit/DebitNotice")}
      handleConfirm={() => {
        handleSubmit();

        // handleClose();
      }}
      // loading={makeInvoiceMutation.isPending}
      handleCancel={handleClose}
      handleBackBtn={handleClose}
      handleClose={handleClose}
      buttonsNames={{
        action: "invoice.sendNotification",
        cancel: "cancel",
      }}
    >
      <Stack gap={"12px"}>
        <InvoiceNotificationSendContent
      invoice={mappedInvoices as NotificationInvoice}
      btnSubmitRef={btnSubmitRef}
      handleClose={handleClose}
    />
      </Stack>
    </ModalInvoice>
  );
};
