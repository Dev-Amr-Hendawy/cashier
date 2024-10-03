import axios from "axios";

export interface CheckCodeData {
  // phone: string;
  // email: string;
  // code: string;
  // active: string;
  // type: "1" | "2" | "" | string;
  [key: string]: string;
  // TODO Optimize ya shiko
  // device_country_id: number;
  // country_id: number | 1;
}
export const checkCodeApi = async (checkCode: CheckCodeData) => {
  try {
    const formData = new FormData();
    for (const key in checkCode) {
      formData.append(key, checkCode[key]);
    }
    formData.append("active", "1");
    // formData.append("device_country_id", "1");
    formData.append("country_id", "1");
    const { data } = await axios.post("client/auth/check_code", formData);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
