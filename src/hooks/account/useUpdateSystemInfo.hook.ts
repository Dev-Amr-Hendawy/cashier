import { toast } from "react-toastify";
import { updateProfile } from "@myCash/apis";
import { ACCOUNT_QUERY_KEY } from "@myCash/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUpdateSystemInfo = (fn?: () => void) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation =useMutation({
    mutationFn: async (values: { [key: string]: string }) => {
      setLoading(true);
      setIsSuccess(false);
      const response = await updateProfile(values);
      setLoading(false);
      return response;
    },
    onSuccess: (data) => {
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "update-profile-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "update-profile-success",
        });
        queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
        fn && fn();
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
