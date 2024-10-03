import { Expense } from "@myCash/types";
import axios from "axios";

const EXPENSES_BASE_URL = "/sales/expense";

export const getExpenses = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${EXPENSES_BASE_URL}/get?page=${props.pageParam}&search_text=${
      props.queryKey[1] || ""
    }&date_from=${props.queryKey[2]}&date_to=${props.queryKey[3]}&sort=${
      props.queryKey[4]
    }&type=${props.queryKey[5]}`
  );
  return response?.data?.data?.data as Expense[];
};

export const addExpense = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }

  return axios.post(`${EXPENSES_BASE_URL}/create`, formData);
};

export const updateExpense = async (values: { [key: string]: string }) => {
  try {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    return axios.post(`${EXPENSES_BASE_URL}/update`, values);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteExpense = async (id: number) => {
  try {
    const response = await axios.delete(
      `${EXPENSES_BASE_URL}/delete?expense_id=${id}`
    );
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
