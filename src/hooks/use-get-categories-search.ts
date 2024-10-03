import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoriesBySearch } from "../apis";
import { CATEGORIES_SEARCH_QUERY_KEY } from "../constants";

export const useGetCategoriesSearch = (search_text: string) => {
  const { data, error, isPending, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: [CATEGORIES_SEARCH_QUERY_KEY, search_text],
    queryFn: getCategoriesBySearch,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 6000,
  });

  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, fetchNextPage]);

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
