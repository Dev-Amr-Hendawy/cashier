import { Product, editInitialValuesType } from "@myCash/types/types";
import axios from "axios";

const PRODUCTS_BASE_URL = "stock/products";

export const getProducts = async (props: {
  pageParam: number | false;
  queryKey: (string | null | undefined | number| Date )[];
}) => {
  const response = await axios.get(
    `${PRODUCTS_BASE_URL}/get?page=${props.pageParam}&searchText=${
      props.queryKey[1] || props.queryKey[7] || ""
    }&cat_id=${props.queryKey[2] || ""}&sort=${
      props?.queryKey[3] || ""
    }&discountType=${props.queryKey[4] || ""}&date_from=${
      props.queryKey[5] || ""
    }&date_to=${props.queryKey[6] || ""}`
  );
  return response?.data?.data?.data as Product[];
};


export const getManyProductsAi = async () => {
  const response = await axios.get(
    `stock/Ai/detect_products`
  );
  return response?.data?.data as Product[];
};
export const deleteProduct = async (id: number) => {
  const formData = new FormData();
  formData.append("product_id", String(id));
  const response = await axios.post(`${PRODUCTS_BASE_URL}/delete`, formData);
  return response?.data;
};

export const createProduct = async (data: editInitialValuesType) => {
  const formData = new FormData();

  if (data?.taxType === "0") {
    data.taxAvailable = "2";
  } else {
    data.taxAvailable = "1";
  }
  if (data?.buyTaxType === "0") {
    data.buyTaxAvailable = "2";
  } else {
    data.buyTaxAvailable = "1";
  }
  // if (data?.taxType === "2") {
  //   data.taxAvailable = "1";
  //   data.taxType = "1";
  // }
  // if (data?.taxType === "3") {
  //   data.taxAvailable = "1";
  //   data.taxType = "2";
  // }

  if (data.product_add_sort && data.cat_id) {
    data.parentCat_id = data.cat_id;
    data.cat_id = "";
  }
  Object.keys(data).forEach((key) => {
    if (key !== "product_add_sort") {
      formData.append(key, data[key as keyof editInitialValuesType] as string);
    }
  });
  const response = await axios.post(`${PRODUCTS_BASE_URL}/create`, formData);
  return response?.data;
};
export const updateProduct = async (data: editInitialValuesType) => {
  const formData = new FormData();

  if (data?.taxType === "0") {
    data.taxAvailable = "2";
  } else {
    data.taxAvailable = "1";
  }

  if (data.product_add_sort && data.cat_id) {
    data.parentCat_id = data.cat_id;
    data.cat_id = "";
  }
  if (typeof data.image === "string") {
    delete data.image;
  }
  Object.keys(data).forEach((key) => {
    if (key !== "product_add_sort") {
      formData.append(key, data[key as keyof editInitialValuesType] as string); // Add type assertion to fix the error
    }
  });
  const response = await axios.post(`${PRODUCTS_BASE_URL}/update`, formData);
  return response?.data;
};
