import { useEffect } from "react";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBranches } from "@myCash/apis";
import { BRANCHES_QUERY_KEY } from "@myCash/constants";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

export const useGetBranches = (filters?: {
  date_from: string;
  date_to: string;
  status: string;
  city: string;
}) => {
  const branchState = useSelector((state: RootState) => state.branch);
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
      BRANCHES_QUERY_KEY,
      branchState?.filter?.search_text,
      filters?.date_from,
      filters?.date_to,
      filters?.status,
      filters?.city,
    ],
    queryFn: getBranches,
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
