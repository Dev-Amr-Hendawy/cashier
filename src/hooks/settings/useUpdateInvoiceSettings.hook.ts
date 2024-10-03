import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoiceSettings } from "@myCash/apis";
import { toast } from "react-toastify";
import { SETTINGS_QUERY_KEY } from "@myCash/constants";
import { useState } from "react";

export const useUpdateInvoiceSettings = (fn?: () => void) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation =useMutation({
    mutationFn: async (values: { [key: string]: string }) => {
      setLoading(true);
      setIsSuccess(false);
      const response = await updateInvoiceSettings(values);
      setLoading(false);
      return response;
    },
    onSuccess: (data) => {
      fn && fn();
      if (data?.data?.status === 0) {
        toast.error(data?.data.message, {
          toastId: "update-invoice-settings-error",
        });
      } else if (data?.data?.status == 1) {
        queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
        toast.success(data?.data?.message, {
          toastId: "update-invoice-settings-success",
        });
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
