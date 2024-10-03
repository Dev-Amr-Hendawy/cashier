import { Branch } from "@myCash/types";
import axios from "axios";

const BRANCHES_BASE_URL = "/sales/branch";

export const getBranches = async (props: {
  pageParam: number | false;
  queryKey: (string | undefined)[];
}) => {
  const response = await axios.get(
    `${BRANCHES_BASE_URL}/get?page=${props.pageParam}&search_text=${
      props?.queryKey[1] || ""
    }&date_from=${props?.queryKey[2] ?? ""}&date_to=${
      props?.queryKey[3] ?? ""
    }&status=${props?.queryKey[4] ?? ""}&city=${props?.queryKey[5]}
    `
  );
  return response?.data?.data?.data as Branch[];
};

export const addBranch = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${BRANCHES_BASE_URL}/create`, values);
};

export const updateBranch = async (values: { [key: string]: string }) => {
  try {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    return axios.post(`${BRANCHES_BASE_URL}/update`, values);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBranch = async (id: number) => {
  try {
    const formData = new FormData();
    formData.append("branch_id", id.toString());
    const response = await axios.post(`${BRANCHES_BASE_URL}/delete`, formData);
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
