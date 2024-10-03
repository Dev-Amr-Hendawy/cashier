import { Employee } from "@myCash/types";
import axios from "axios";

const EMPLOYEES_BASE_URL = "/client/employee";

export const getEmployees = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${EMPLOYEES_BASE_URL}/get?page=${props.pageParam}&search_text=${
      props.queryKey[1] || ""
    }&date_from=${props.queryKey[2]}&date_to=${props.queryKey[3]}&branch_id=${
      props.queryKey[4]
    }`
  );
  return response?.data?.data?.data as Employee[];
};

export const addEmployee = async (values: { [key: string]: string }) => {
  try {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    return axios.post(`${EMPLOYEES_BASE_URL}/create`, formData);
  } catch (error) {
    return Promise.reject(error);
  }
  // const formData = new FormData();
  // for (const key in values) {
  //   formData.append(key, values[key]);
  // }
  // return axios.post(`${EMPLOYEES_BASE_URL}/create`, formData);
};

export const updateEmployee = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${EMPLOYEES_BASE_URL}/update`, values);
};

export const deleteEmployee = async (id: number) => {
  try {
    const formData = new FormData();
    formData.append("employee_id", id.toString());
    const response = await axios.post(`${EMPLOYEES_BASE_URL}/delete`, formData);
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateEmployeeStatus = async (values: {
  [key: string]: string;
}) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${EMPLOYEES_BASE_URL}/change_status`, values);
};
