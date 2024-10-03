import axios from "axios";

export type LoginData = {
  phone: string;
  password: string;
  country_id: string;
};

export const login = async (loginData: LoginData) => {
  const formData = new FormData();
  formData.append("phone", loginData.phone);
  formData.append("password", loginData.password);
  formData.append("country_id", "1");
  const { data } = await axios.post("client/auth/login", formData);
  return data;
};
