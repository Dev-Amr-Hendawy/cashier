import { SalesReport } from "@myCash/types";
import axios from "axios";

const REPORTS_BASE_URL = "/sales/report";
export const getReports = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${REPORTS_BASE_URL}/get?page=${props.pageParam}&date_from=${props.queryKey[1]}&date_to=${props.queryKey[2]}&type=${props.queryKey[3]}&branch_id=${props.queryKey[4]}`
  );
  return response?.data?.data?.data as SalesReport[];
};

export const addReport = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${REPORTS_BASE_URL}/create`, formData);
};
