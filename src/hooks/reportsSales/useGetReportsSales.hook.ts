import { useEffect } from "react";
import { REPORTS_SALES_QUERY_KEY } from "@myCash/constants";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getreportsInvoicesSales } from "@myCash/apis";

export const useGetReportsSales = (filters: {
  date_to: string;
  date_from: string;
  type: string;
  sort: string;
  branch_id:string;
}) => {
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
      REPORTS_SALES_QUERY_KEY,
      filters.date_from || "",
      filters.date_to || "",
      filters.type || "", 
       filters.branch_id || "",
      // TODO:: sort filter when integrated BE
    ],
    // you return an array of any for me to work
    queryFn: getreportsInvoicesSales,
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
