import { RECEIPTS_QUERY_KEY } from "../../constants";
import { RootState } from "@myCash/lib";
import { getReceipts } from "@myCash/apis";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const useGetReceipts = (search_text: string) => {
  const receiptsState = useSelector((state: RootState) => state.receipt);
  const { id, invoice_id } = useParams();
  const {
    data,
    error,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    status,
  } = useInfiniteQuery({
    refetchOnWindowFocus: true,
    queryKey: [
      RECEIPTS_QUERY_KEY,
      id || "",
      invoice_id,
      //TODO change the array to an object for better readability
      search_text,
      receiptsState.filters.paymentStatus,
      receiptsState.filters.date_from,
      receiptsState.filters.date_to,
      receiptsState.filters.sort,
    ],
    // you return an array of any for me to work
    queryFn: getReceipts,
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
    status,
  };
};
