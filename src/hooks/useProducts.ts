import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getProducts } from "../apis/products";
import { PRODUCTS_QUERY_KEY } from "../constants";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../lib";
import { useSelector } from "react-redux";

export const useProducts = (search_text?: string) => {
  const [searchParams] = useSearchParams();
  const filterState = useSelector((state: RootState) => state.products.filter);
  // const categoriesState = useSelector((state: RootState) => state.category);

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
      PRODUCTS_QUERY_KEY,
      searchParams.get("searchText") || search_text,
      // categoriesState?.singleCategoryId,
      searchParams.get("cat_id"),
      filterState?.sort,
      filterState?.discountType,
      filterState.date_from && filterState.date_from,
      filterState.date_to && filterState.date_to,
      filterState.search_text,
    ],
    queryFn: getProducts,
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
    fetchNextPage,
  };
};
