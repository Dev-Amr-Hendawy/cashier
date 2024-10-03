import { getSettings } from "@myCash/apis";
import { SETTINGS_QUERY_KEY } from "@myCash/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetSettings = () => {
  return useQuery({ queryKey: [SETTINGS_QUERY_KEY], queryFn: getSettings });
};
