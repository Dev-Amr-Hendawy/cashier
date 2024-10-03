import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "@myCash/apis";
import { toast } from "react-toastify";
import { EXPENSES_QUERY_KEY } from "@myCash/constants";
import { useDispatch } from "react-redux";
import { setBranch } from "@myCash/lib";
import { IBaseApiResponse } from "@myCash/types";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useUpdateExpense = (fn?: () => void) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) => updateExpense(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
      fn && fn();
      dispatch(setBranch(data.data?.data));
      if (data?.data?.status === 0) {
        toast.error(data?.data.message, {
          toastId: "update-expense-error",
        });
      } else if (data?.data?.status == 1) {
        toast.success(data?.data?.message, {
          toastId: "update-expense-success",
        });
      }
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
