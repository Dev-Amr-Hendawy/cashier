import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompleteInfo } from "@myCash/apis";
import { toast } from "react-toastify";
import { ACCOUNT_QUERY_KEY } from "@myCash/constants";

export const useCompleteInfo = (fn?: () => void) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (values: { [key: string]: string }) => {
      setLoading(true);
      setIsSuccess(false);
      const response = await updateCompleteInfo(values);
      setLoading(false);
      return response;
    },
    onSuccess: (data) => {
      fn && fn();
      
      if (+data?.status === 0 || +data?.data?.status === 0) {
        toast.error(data?.data?.message || "An error occurred", {
          toastId: "update-invoice-settings-error",
        });
      } else if (data?.data?.status === 1) {
        queryClient.invalidateQueries({
          queryKey: [ACCOUNT_QUERY_KEY],
        });
        // toast.success(data?.data?.message || "Success!", {
        //   toastId: "update-invoice-settings-success",
        // });
        setIsSuccess(true);
      }
    },
    onError: () => {
      setLoading(false);
      setIsSuccess(false);
      toast.error("Something went wrong!");
    },
  });

  return {
    mutate: mutation.mutate,
    loading,
    isSuccess,
  };
};