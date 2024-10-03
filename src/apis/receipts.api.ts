import { ReceiptsData } from "@myCash/types";
import axios from "axios";

const RECEIPTS_BASE_URL = "sales/receipt";
// ?invoice_id&client_id&paymentStatus=

export const getReceipt = async (props: { queryKey: [string, string] }) => {
  return axios.get(
    `${RECEIPTS_BASE_URL}/single?invoice_id=${props.queryKey[1]}`
  );
};

export const getReceipts = async (props: {
  pageParam: number | false;
  queryKey: (string | null | undefined | number)[];
}) => {
  const response = await axios.get(
    `${RECEIPTS_BASE_URL}/get?page=${props.pageParam}&client_id=${
      props.queryKey[1] || ""
    }&invoice_id=${props.queryKey[2] || ""}&search_text=${
      props.queryKey[3] || ""
    }&paymentStatus=${props.queryKey[4] || ""}&date_from=${
      props.queryKey[5] || ""
    }&date_to=${props.queryKey[6] || ""}&sort=${props.queryKey[7] || ""}`
  );
  return response?.data?.data?.data;
};

export const getLimitedReceipts = async (props: {
  queryKey: (string | null | undefined | number)[];
}) => {
  const response = await axios.get(
    `${RECEIPTS_BASE_URL}/get?client_id=${props.queryKey[1]}&limit=${
      props.queryKey[2] || ""
    }`
  );
  return response?.data?.data;
};

export const payReceipts = async (data: ReceiptsData) => {
  const formData = new FormData();
  // Object.keys(data).forEach((key) => {
  //   formData.append(key, data[key as keyof ReceiptsData] as string);
  // });
  if (data.cashPrice) formData.append("cashPrice", data.cashPrice);
  if (data.visaPrice) formData.append("visaPrice", data.visaPrice);
  formData.append("receipt_id", data.receipt_id);
  const response = axios.post(`${RECEIPTS_BASE_URL}/pay`, formData);
  return response;
};

export const getSingleReceipt = async (props: {
  queryKey: (string | null | undefined | number)[];
}) => {
  return axios.get(
    `${RECEIPTS_BASE_URL}/single?receipt_id=${props.queryKey[1]}`
  );
};
