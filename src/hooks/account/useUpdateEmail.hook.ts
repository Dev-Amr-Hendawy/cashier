import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateEmail } from "@myCash/apis";
import { useDispatch } from "react-redux";
import { setConfirmStep } from "@myCash/lib";
import { ACCOUNT_QUERY_KEY } from "@myCash/constants";

export const useUpdateEmail = (fn?: () => void) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) => updateEmail(values),
    onSuccess: (data) => {
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "update-email-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "update-email-success",
        });
        queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
        dispatch(setConfirmStep(""));
        fn && fn();
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
