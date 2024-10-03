import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInfiniteCategories } from "../apis";
import { CATEGORIES_QUERY_KEY } from "../constants";
import { setCategories } from "../lib/store/slices/category-slice";

export const useGetCategories = () => {
  const { data, error, isPending, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: getInfiniteCategories,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAddCategory = () => {
      dispatch(setCategories(data?.pages?.reduce((acc, page) => [...acc, ...page], []) || []));
    };
    if (hasNextPage) {
      fetchNextPage();
    }
    handleAddCategory();
  }, [hasNextPage, fetchNextPage, data?.pages, dispatch]);
  // const { ref, inView } = useInView();

  return {
    data,
    error,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
  };
};
