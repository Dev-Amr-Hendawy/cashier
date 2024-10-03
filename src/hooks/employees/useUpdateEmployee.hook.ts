import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "@myCash/apis";
import { toast } from "react-toastify";
import { EMPLOYEES_QUERY_KEY } from "@myCash/constants";
import { useDispatch } from "react-redux";
import { setEmployee } from "@myCash/lib";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (values: { [key: string]: string }) => updateEmployee(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
      if (data?.data.status === 0) {
        toast.error(data?.data?.message || "Something went wrong", {
          toastId: "update-employee-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message || "Updated Successfully", {
          toastId: "update-employee-success",
        });
        queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });

        dispatch(setEmployee({ ...data?.data?.data }));
      }
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
