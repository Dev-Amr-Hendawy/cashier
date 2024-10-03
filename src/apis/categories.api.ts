import axios from "axios";
import { Category } from "../types/types";
export const getCategories = async () => {
  const response = await axios.get(`stock/category/get`);
  return response?.data?.data?.data;
};

export const getInfiniteCategories = async (props: { pageParam: number | false; queryKey: (string | null)[] }) => {
  const response = await axios.get(
    `stock/category/get?page=${props.pageParam}&search_text=${props.queryKey[1] || ""}&parents=1`
  );
  return response?.data?.data?.data;
};

type GetSingleCategoryProps = Category & {
  parent_name: string;
};
export const getCategoriesBySearch = async (props: { pageParam: number | false; queryKey: (string | null)[] }) => {
  const response = await axios.get(`stock/category/get?page=${props.pageParam}&search_text=${props.queryKey[1] || ""}`);
  return response?.data?.data?.data as Category[];
};
export const getSingleCategory = async (props: { queryKey: (string | number | undefined | null | Date)[] }) => {
  const response = await axios.get(`stock/category/single?cat_id=${props.queryKey[1]}`);
  return response?.data?.data as GetSingleCategoryProps;
};
