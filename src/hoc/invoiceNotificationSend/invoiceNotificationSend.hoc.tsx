import { CircularLoader } from "@myCash/common";
import { InvoiceNotificationSendContent } from "@myCash/components";
import { useGetInvoice } from "@myCash/hooks";
import { RootState } from "@myCash/lib";
import { NotificationInvoice } from "@myCash/types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface InvoiceNotificationSendHocProps {}

export const InvoiceNotificationSendHoc: React.FC<
  InvoiceNotificationSendHocProps
> = () => {
  const { invoiceId } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const { data, isPending, isError } = useGetInvoice(invoiceId ?? "");
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
  if (isPending) return <CircularLoader size={50} />;
  if (isError) return <h1>Error not found</h1>;
  return (
    <InvoiceNotificationSendContent
      invoice={mappedInvoices as NotificationInvoice}
    />
  );
};
