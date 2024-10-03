import { useEffect } from "react";
import { getEmployees } from "@myCash/apis";
import { EMPLOYEES_QUERY_KEY } from "@myCash/constants";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

export const useGetEmployees = (filters?: {
  date_from: string;
  date_to: string;
  branch_id: string;
}) => {
  const employeeState = useSelector((state: RootState) => state.employee);
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
      EMPLOYEES_QUERY_KEY,
      employeeState?.filter?.search_text,
      filters?.date_from || "",
      filters?.date_to || "",
      filters?.branch_id || "",
    ],
    // you return an array of any for me to work
    queryFn: getEmployees,
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
