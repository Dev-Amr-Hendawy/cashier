import { INVOICES_NOTIFICATIONS_QUERY_KEY } from "@myCash/constants";
import { RootState } from "@myCash/lib";
import { getInvoicesNotifications } from "@myCash/apis";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// type Props = {
//   client_id?: string;
//   invoiceType?: string;
// };

// {
//   client_id,
//   invoiceType,
// }: Props = {}

export const useGetInvoicesNotifications = () => {
  const { invoiceId } = useParams();
  const invoicesState = useSelector(
    (state: RootState) => state.invoicesNotifications
  );
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
      INVOICES_NOTIFICATIONS_QUERY_KEY,
      invoiceId || "",
      invoicesState.filters.search_text,
      invoicesState.filters.sort,
      invoicesState.filters.date_from,
      invoicesState.filters.date_to,
      invoicesState.filters.type,
    ],
    queryFn: getInvoicesNotifications,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length + 1;
    },
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
