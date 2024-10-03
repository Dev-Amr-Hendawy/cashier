import axios from "axios";

export type ForgetPasswordValuesType = {
  key: string;
  type: string;
  country_id: string;
  [key: string]: string;
};

export const forgetPassword = async (values: ForgetPasswordValuesType) => {
  try {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    const { data } = await axios.post("client/auth/forget_password", formData);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
