import { useEffect } from "react";
import { getReportsInventory } from "@myCash/apis";
import { REPORTS_INVENTORY_QUERY_KEY } from "@myCash/constants";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetReportsInventory = (filters: {
  date_from: string;
  date_to: string;
  type: string;
}) => {
  // const filters = useSelector((state: RootState) => state.filter);
  const {
    data,
    error,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: [
      REPORTS_INVENTORY_QUERY_KEY,
      //   employeeState?.filter?.search_text,
      "",
      filters.date_from || "",
      filters.date_to || "",
      filters.type || "",
    ],
    // you return an array of any for me to work
    queryFn: getReportsInventory,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < 10) {
        return undefined;
      }
      return allPages?.length + 1;
    },
    staleTime: 6000,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return {
    data,
    error,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
    ref,
  };
};
