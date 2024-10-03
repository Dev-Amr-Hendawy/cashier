import axios from "axios";

export const postBeginShiftApi = async (beginShift: {
  [key: string]: string;
}) => {
  const formData = new FormData();
  formData.append("startCash", beginShift.cash);
  formData.append("startVisa", beginShift.visa);
  formData.append("differentInCash", beginShift.differentInCash);
  formData.append("differentInVisa", beginShift.differentInVisa);
  const { data } = await axios.post("client/shift/open_shift", formData);
  return data;
};

export const getCurrentShiftApi = async () => {
  const { data } = await axios.get("client/shift/current_shift");
  return data;
};
