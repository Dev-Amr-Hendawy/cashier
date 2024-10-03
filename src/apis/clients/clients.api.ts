import { Client } from "../../types/types";
import axios from "axios";

const CLIENTS_BASE_URL = "/sales/client";

export const addClient = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${CLIENTS_BASE_URL}/create`, formData);
};

export const getClients = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${CLIENTS_BASE_URL}/get?page=${props.pageParam}&search_text=${
      props.queryKey[1] || ""
    }&date_from=${props.queryKey[2]}&date_to=${
      props.queryKey[3]
    }&payment_status=${props.queryKey[4]}&type=${props.queryKey[5]}&sort=${
      props.queryKey[6]
    }`
  );
  if (!response?.data?.data?.data) throw new Error("No data found");
  return response?.data?.data?.data as Client[];
};

export const updateClient = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${CLIENTS_BASE_URL}/update`, values);
};

export const getClient = async (id: number) => {
  const response = await axios.get(
    `${CLIENTS_BASE_URL}/single?client_id=${id}`
  );
  return response?.data?.data as Client;
};

export const deleteClient = async (id: number) => {
  try {
    const response = await axios.delete(
      `${CLIENTS_BASE_URL}/delete?client_id=${id.toLocaleString()}`
    );
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
