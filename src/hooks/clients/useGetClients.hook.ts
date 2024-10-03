import { CLIENTS_QUERY_KEY } from "../../constants";
import { RootState } from "@myCash/lib";
import { getClients } from "../../apis/clients/clients.api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetClients = (search_text: string) => {
  const clientsState = useSelector((state: RootState) => state.client);
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
    refetchOnWindowFocus: false,
    queryKey: [
      CLIENTS_QUERY_KEY,
      search_text,
      clientsState.date_from,
      clientsState.date_to,
      clientsState.invoice_paid,
      clientsState.type,
      clientsState.client_sort,
    ],
    // you return an array of any for me to work
    queryFn: getClients,
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
