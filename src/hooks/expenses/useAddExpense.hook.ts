import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { EXPENSES_QUERY_KEY } from "@myCash/constants";
import { addExpense } from "@myCash/apis";

export const useAddExpense = (fn?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { [key: string]: string }) => addExpense(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "add-expense-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "add-expense-success",
        });
      }
      fn && fn();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
