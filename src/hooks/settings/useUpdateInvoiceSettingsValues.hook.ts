import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoiceSettingsValues } from "@myCash/apis";
import { toast } from "react-toastify";
import { SETTINGS_QUERY_KEY } from "@myCash/constants";

export const useUpdateInvoiceSettingsValues = (fn?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      updateInvoiceSettingsValues(values),
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
      }
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });
};
