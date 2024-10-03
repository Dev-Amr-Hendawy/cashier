import { INVOICES_QUERY_KEY } from "@myCash/constants";
import { RootState } from "@myCash/lib";
import { getInvoices } from "@myCash/apis";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

type Props = {
  client_id?: string;
  invoiceType?: string;
};

export const useGetInvoices = ({ client_id }: Props = {}) => {
  // const { client_id } = useParams();
  const invoicesState = useSelector((state: RootState) => state.invoices);
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
      INVOICES_QUERY_KEY,
      client_id || "",
      invoicesState.filters.invoiceType || "",
      invoicesState.filters.search_text,
      invoicesState.filters.sort,
      invoicesState.filters.date_from,
      invoicesState.filters.date_to,
      invoicesState.filters.paymentStatus,
      invoicesState.filters.type,
      invoicesState.filters.isReturn,
    ],
    queryFn: getInvoices,
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
    ref,
  };
};
