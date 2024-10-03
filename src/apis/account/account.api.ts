import axios from "axios";

const ACCOUNT_BASE_URL = "/client/profile";

export const editCode = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${ACCOUNT_BASE_URL}/edit_code`, formData);
};

export const checkOtpApi = async (checkCode: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in checkCode) {
    formData.append(key, checkCode[key]);
  }
  formData.append("active", "1");
  // formData.append("device_country_id", "1");
  formData.append("country_id", "1");

  const { data } = await axios.post("client/auth/check_code", formData);
  return data;
};

export const getAccountInfo = async () => {
  const { data } = await axios.get(`/client/auth/my_info`);
  return data;
};

export const updatePhone = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${ACCOUNT_BASE_URL}/update_phone`, formData);
};

export const updateEmail = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${ACCOUNT_BASE_URL}/update_email`, formData);
};

export const updateProfile = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${ACCOUNT_BASE_URL}/update_profile`, formData);
};
