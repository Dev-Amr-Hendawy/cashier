import axios from "axios";

export const getDevices = async () => {
  const response = await axios.get(
    `/client/general_data/get_devices?country_id=1`
  );
  return response?.data;
};
