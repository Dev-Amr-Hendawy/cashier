import axios from "axios";

export const postSubscriptionPayment = async (values: {
  [key: string]: string;
}) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`/client/payment/get_subscription_payment_link`, formData);
};
export const calculateSubscription = async (values: {
  [key: string]: string;
}) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`/client/payment/cal_price`, formData);
};
