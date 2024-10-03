import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BRANCHES_QUERY_KEY } from "@myCash/constants";
import { addBranch } from "@myCash/apis";

export const useAddBranch = (fn?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { [key: string]: string }) => addBranch(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [BRANCHES_QUERY_KEY] });
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "add-branch-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "add-branch-success",
        });
        fn && fn();
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
