import axios from "axios";

const INVOICES_BASE_URL = "sales/invoice";

export const createInvoice = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }

  return axios.post(`${INVOICES_BASE_URL}/make_invoice`, values);
};

export const getInvoice = async (props: { queryKey: [string, string] }) => {
  return axios.get(
    `${INVOICES_BASE_URL}/single?invoice_id=${props.queryKey[1]}`
  );
};

export const getInvoices = async (props: {
  pageParam: number | false;
  queryKey: (string | null | undefined | number)[];
}) => {
  const response = await axios.get(
    `${INVOICES_BASE_URL}/get?page=${props.pageParam}&client_id=${
      props.queryKey[1] || ""
    }&invoiceType=${props.queryKey[2] || ""}&search_text=${
      props.queryKey[3] || ""
    }&sort=${props.queryKey[4] || ""}&date_from=${
      props.queryKey[5] || ""
    }&date_to=${props.queryKey[6] || ""}&paymentStatus=${
      props.queryKey[7] || ""
    }&type=${props.queryKey[8] || ""}&isReturn=${props.queryKey[9] || ""}`
  );
  return response?.data?.data?.data;
};

export const getLimitedInvoices = async (props: {
  queryKey: (string | null | undefined | number)[];
}) => {
  const response = await axios.get(
    `${INVOICES_BASE_URL}/get?client_id=${props.queryKey[1]}&limit=${
      props.queryKey[2] || ""
    }`
  );
  return response?.data?.data;
};

export const postResetSellOrder = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }

  return axios.post(`${INVOICES_BASE_URL}/start_current_invoice_order`, values);
};
export const postResetBuyOrder = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(
    `${INVOICES_BASE_URL}/start_current_buy_invoice_order`,
    values
  );
};
