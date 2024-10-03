import { toast } from "react-toastify";
import { deleteExpense } from "@myCash/apis";
import { EXPENSES_QUERY_KEY } from "@myCash/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IBaseApiResponse } from "@myCash/types";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useDeleteExpense = (fn?: () => void) => {
  const {t}=useTranslation();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (expenseId: number) => deleteExpense(expenseId),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [EXPENSES_QUERY_KEY],
      });
      fn && fn();
      if (data?.status === 0) {
        toast.error(data?.message, {
          toastId: "delete-expense-error",
        });
      } else if (data?.status === 1) {
        toast.success(data?.message, {
          toastId: "delete-expense-success",
        });
      }
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
