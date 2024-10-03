import axios from "axios";

export const postDiscountCode = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  formData.append("country_id", "1");
  return axios.post(`/client/discount/check_discount_code`, formData);
};
