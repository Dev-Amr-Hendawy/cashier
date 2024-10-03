import { getPackages } from "@myCash/apis/general/packages.api";
import { PACKAGES_QUERY_KEY } from "@myCash/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetPackages = () => {
  return useQuery({
    queryKey: [PACKAGES_QUERY_KEY],
    queryFn: () => getPackages(),
  });
};
