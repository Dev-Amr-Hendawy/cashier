import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { EMPLOYEES_QUERY_KEY } from "@myCash/constants";
import { addEmployee } from "@myCash/apis";
import { AxiosError } from "axios";
import { IBaseApiResponse } from "@myCash/types";

export const useAddEmployee = (fn?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { [key: string]: string }) => addEmployee(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });

      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "add-employee-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message || "Success", {
          toastId: "add-employee-success",
        });
        fn && fn();
      }
    },
    onError: (e: AxiosError<IBaseApiResponse>) => {
      toast.error(e?.response?.data?.message || e.message);
    },
  });
};
