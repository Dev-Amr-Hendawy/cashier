import axios from "axios";
import { ISettings } from "@myCash/types";

const SETTINGS_BASE_URL = "/client/invoice_setting";

export const getSettings = async () => {
  const response = await axios.get(
    "/client/invoice_setting/get_invoice_setting"
    // `${SETTINGS_BASE_URL}/get_invoice_setting
    // `
  );
  return response?.data?.data as ISettings;
};

export const updateInvoiceSettings = async (values: {
  [key: string]: string;
}) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`${SETTINGS_BASE_URL}/update_invoice_setting`, values);
};

export const updateInvoiceSettingsValues = async (values: {
  [key: string]: string;
}) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(
    `${SETTINGS_BASE_URL}/update_invoice_setting_value`,
    values
  );
};

export const updateCompleteInfo = async (values: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return axios.post(`/client/account_info/complete_data`, values);
};
