import { useEffect } from "react";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getExpenses } from "@myCash/apis";
import { EXPENSES_QUERY_KEY } from "@myCash/constants";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

export const useGetExpenses = (search_text: string) => {
  const expenseState = useSelector((state: RootState) => state.expense);

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
      EXPENSES_QUERY_KEY,
      search_text,
      expenseState.date_from,
      expenseState.date_to,
      expenseState.expense_sort,
      expenseState.expense_slider,
    ],
    queryFn: getExpenses,
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
