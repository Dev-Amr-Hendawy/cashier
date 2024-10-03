import axios from "axios";
export type ResetData = {
  password: string;
};
export const resetPassword = async (resetData: ResetData) => {
  const formData = new FormData();
  formData.append("password", resetData.password);
  const { data } = await axios.post("client/auth/reset_password", formData);
  return data;
};
