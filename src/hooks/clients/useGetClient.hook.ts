import { getClient } from "@myCash/apis";
import { useQuery } from "@tanstack/react-query";

export const useGetClient = (id: number) => {
  return useQuery({
    queryKey: ["client", id],
    queryFn: () => getClient(id),
    enabled: !!id,
  });
};
