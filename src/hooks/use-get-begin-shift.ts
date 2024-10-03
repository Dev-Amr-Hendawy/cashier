import { useQuery } from "@tanstack/react-query";
import { getCurrentShiftApi } from "../apis";
import { CURRENT_SHIFT_QUERY_KEY } from "@myCash/constants";

// TODO::refac
export const useGetCurrentShift = () => {
  return useQuery({
    queryKey: [CURRENT_SHIFT_QUERY_KEY],
    queryFn: getCurrentShiftApi,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });
};
