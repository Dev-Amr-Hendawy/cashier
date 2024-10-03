import { IInvoiceNotification } from "@myCash/types";
import axios from "axios";

const INVOICES_BASE_URL = "/sales/invoiceNotification";

export const getNotificationSingle = async (id: string) => {
  const response = await axios.get(
    `${INVOICES_BASE_URL}/single?invoiceNotification_id=${id}`
  );
  return response?.data?.data as IInvoiceNotification;
};
