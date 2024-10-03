import axios from "axios";
export interface ResendCodeData {
  phone: string;
  country_id: string;
  [key: string]: string;
}
export const resendCodeApi = async (resendCodeData: ResendCodeData) => {
  try {
    const formData = new FormData();
    for (const key in resendCodeData) {
      formData.append(key, resendCodeData[key]);
    }
    const { data } = await axios.post("client/auth/resend_code", formData);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
