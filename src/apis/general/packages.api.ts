import axios from "axios";

export const getPackages = async () => {
  const response = await axios.get(
    `client/general_data/get_packages?limit=50`
  );
  return response?.data;
};
