import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeStatus } from "@myCash/apis";
import { toast } from "react-toastify";
import { EMPLOYEES_QUERY_KEY } from "@myCash/constants";

export const useUpdateEmployeeStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      updateEmployeeStatus(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
      if (data?.data.status === 0) {
        toast.error(data?.data?.message || "Error, please try again!", {
          toastId: "update-employee-status-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message || "Success", {
          toastId: "update-employee-status-success",
        });
      }
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
