import { useEffect } from "react";
import { getreportsInvoicesBuy } from "@myCash/apis";
import { REPORTS_BUY_QUERY_KEY } from "@myCash/constants";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetReportsInvoicesBuy = (filters: {
  date_from: string;
  date_to: string;
  invoiceType: string;
}) => {
  const {
    data,
    error,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    isError,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: [
      REPORTS_BUY_QUERY_KEY,
      filters.date_from || "",
      filters.date_to || "",
      filters.invoiceType || "",
    ],
    // you return an array of any for me to work
    queryFn: getreportsInvoicesBuy,
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
    isError,
  };
};
