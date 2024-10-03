import axios from "axios";

const QUICK_INVOICES_BASE_URL = "sales/invoice";

export const createQuickInvoice = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${QUICK_INVOICES_BASE_URL}/quick_invoice`, values);
};
