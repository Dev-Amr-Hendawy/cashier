import { ProductReport } from "@myCash/types";
import axios from "axios";

const REPORTS_BASE_URL = "/sales/productReport";
export const getReportsProducts = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${REPORTS_BASE_URL}/get?page=${props.pageParam}&date_from=${props.queryKey[1]}&date_to=${props.queryKey[2]}&type=${props.queryKey[3]}`
  );
  return response?.data?.data?.data as ProductReport[];
};

export const addReportsProducts = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${REPORTS_BASE_URL}/create`, formData);
};
