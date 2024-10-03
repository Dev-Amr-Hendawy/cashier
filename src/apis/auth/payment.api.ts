import axios from "axios";

export const paymentApi = async (data: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const response = await axios.post(
    `client/payment/get_payment_link`,
    formData
  );
  return response?.data;
};
