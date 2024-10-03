import { toast } from "react-toastify";
import { updateProfile } from "@myCash/apis";
import { ACCOUNT_QUERY_KEY } from "@myCash/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = (fn?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) => updateProfile(values),
    onSuccess: (data) => {
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "update-profile-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "update-profile-success",
        });
        queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
        fn && fn();
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
