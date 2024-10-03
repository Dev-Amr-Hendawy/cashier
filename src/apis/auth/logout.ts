import axios from "axios";

export const logout = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  const { data } = await axios.post("client/auth/logout", formData);
  return data;
};
