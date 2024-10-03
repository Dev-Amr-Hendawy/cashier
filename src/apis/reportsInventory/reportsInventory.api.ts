import { InventoryReport } from "@myCash/types";
import axios from "axios";

const REPORTS_BASE_URL = "/stock/inventory";

export const getReportsInventory = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  try {
    const response = await axios.get(
      `${REPORTS_BASE_URL}/get?page=${props.pageParam}&search_text=${
        props.queryKey[1] || ""
      }&date_from=${props.queryKey[2]}&date_to=${props.queryKey[3]}&type=${
        props.queryKey[4]
      }`
    );
    return response?.data?.data?.data as InventoryReport[];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addReportsInventory = async (values: {
  [key: string]: string;
}) => {
  try {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    return axios.post(`${REPORTS_BASE_URL}/create`, formData);
  } catch (error) {
    return Promise.reject(error);
  }
};
