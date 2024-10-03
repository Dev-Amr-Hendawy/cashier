import { useEffect } from "react";
import { getreportsInvoicesSell } from "@myCash/apis";
import { REPORTS_SELL_QUERY_KEY } from "@myCash/constants";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetReportsInvoicesSell = (filters: {
  date_from: string;
  date_to: string;
  invoiceType: string;
  branch_id?: string;
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
      REPORTS_SELL_QUERY_KEY,
      filters.date_from || "",
      filters.date_to || "",
      filters.invoiceType || "",
      filters.branch_id || "",
    ],
    queryFn: getreportsInvoicesSell,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Check the length of reportsInvoices in the lastPage object
      if (lastPage?.reportsInvoices?.length < 10) {
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