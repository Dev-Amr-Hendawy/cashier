import { getDevices } from "@myCash/apis/general/devices.api";
import { DEVICES_QUERY_KEY } from "@myCash/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetDevices = () => {
  return useQuery({
    queryKey: [DEVICES_QUERY_KEY],
    queryFn: () => getDevices(),
  });
};
