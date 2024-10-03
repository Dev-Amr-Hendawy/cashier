import { getAccountInfo } from "@myCash/apis";
import { ACCOUNT_QUERY_KEY } from "@myCash/constants";
import { setTaxPercentage, updateUserData } from "@myCash/lib";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetInfo = () => {
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    error,
    isFetching,
    isSuccess,
    isPending,
    isRefetching,
  } = useQuery({
    queryKey: [ACCOUNT_QUERY_KEY],
    queryFn: getAccountInfo,
  });

  const dispatchData = useCallback(() => {
    if (data?.data) {      
      dispatch(updateUserData(data?.data));
      dispatch(
        setTaxPercentage(Number(data?.data?.accountInfo?.tax) / 100) || 0
      );

      
    }
  }, [data,data?.data,data?.data?.id, dispatch]);

  useEffect(() => {
    dispatchData();
  }, [data,data?.data, data?.data?.id, dispatch]);

  return {
    data,
    isLoading,
    error,
    isFetching,
    isSuccess,
    isPending,
    isRefetching,
  };
};
