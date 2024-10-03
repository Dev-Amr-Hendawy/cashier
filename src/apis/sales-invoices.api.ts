import { InvoiceType } from "@myCash/types";
import axios from "axios";

const INVOICES_BASE_URL = "/sales/invoice";

export const getInvoiceSingle = async (id: string) => {
  const response = await axios.get(
    `${INVOICES_BASE_URL}/single?invoice_id=${id}`
  );
  return response?.data?.data as InvoiceType;
};
