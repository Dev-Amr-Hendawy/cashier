import axios from "axios";
export interface SignUpData {
  phone: string;
  password: string;
  email: string;
  package_id: string;
  device_country_id: string;
  country_id: string;
}
export const signUpApi = async (signUpData: SignUpData) => {
  const formData = new FormData();
  formData.append("phone", signUpData.phone);
  formData.append("password", signUpData.password);
  formData.append("email", signUpData.email);
  formData.append("country_id", signUpData.country_id);
  // formData.append("influencer_id", "1");
  formData.append("package_id", signUpData.package_id);
  formData.append("device_country_id", signUpData.device_country_id);
  const { data } = await axios.post("client/auth/register", formData);
  return data;
};
