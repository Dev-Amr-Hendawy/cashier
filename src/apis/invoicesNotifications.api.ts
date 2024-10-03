import { IInvoiceNotification } from "@myCash/types";
import axios from "axios";

const INVOICES_NOTIFICATIONS_BASE_URL = "sales/invoiceNotification";

export const getInvoicesNotifications = async (props: {
  pageParam: number | false;
  queryKey: (string | null | undefined | number)[];
}) => {
  const response = await axios.get(
    `${INVOICES_NOTIFICATIONS_BASE_URL}/get?page=${
      props.pageParam
    }&invoice_id=${props.queryKey[1] || ""}&invoiceNumber=${
      props.queryKey[2] || ""
    }&sort=${
      props.queryKey[3] || ""
    }&date_from=${props.queryKey[4] || ""}&date_to=${
      props.queryKey[5] || ""
    }&type=${props.queryKey[6] || ""}`
  );
  return response?.data?.data?.data as IInvoiceNotification[];
};

export const addInvoiceNotification = async (invoice: {
  [key: string]: unknown;
}) => {
  const formData = new FormData();
  for (const key in invoice) {
    if (key === "products") {
      formData.append(key, JSON.stringify(invoice[key] as string));
    } else {
      formData.append(key, invoice[key] as string);
    }
  }
  const response = await axios.post(
    `${INVOICES_NOTIFICATIONS_BASE_URL}/make_invoice_notification`,
    formData
  );
  return response?.data;
};
