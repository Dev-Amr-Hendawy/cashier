import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { INVOICES_QUERY_KEY } from "@myCash/constants";
import { postResetBuyOrder, postResetSellOrder } from "@myCash/apis";
import { AxiosError } from "axios";
import { IBaseApiResponse } from "@myCash/types";

export const useResetInvoiceOrder = (fn?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { [key: string]: string }) => {
      console.log(values.resetType ? true : false);
      return values.resetType && values.resetType === "1"
        ? postResetBuyOrder(values)
        : postResetSellOrder(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });

      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "reset-invoice-order-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message || "Success", {
          toastId: "reset-invoice-order-success",
        });
        fn && fn();
      }
    },
    onError: (e: AxiosError<IBaseApiResponse>) => {
      toast.error(e?.response?.data?.message || e.message);
    },
  });
};
