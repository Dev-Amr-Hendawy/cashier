import { toast } from "react-toastify";
import { deleteEmployee } from "@myCash/apis";
import { EMPLOYEES_QUERY_KEY } from "@myCash/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IBaseApiResponse } from "@myCash/types";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useDeleteEmployee = () => {
  const {t}=useTranslation();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (employeeId: number) => deleteEmployee(employeeId),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEES_QUERY_KEY],
      });
      if (data?.status === 0) {
        toast.error(data?.message, {
          toastId: "delete-employee-error",
        });
      } else if (data?.status === 1) {
        toast.success(data?.message, {
          toastId: "delete-employee-success",
        });
      }
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
