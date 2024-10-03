import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ResetData, resetPassword } from "../../apis";
import { AuthResponseType } from "../../types/types";

export const useChangePassword = (fn?: () => void) => {
  const handleSuccess = (data: AuthResponseType) => {
    if (data.status === 0) {
      toast.error(data?.message, {
        toastId: "changePasswordError",
      });
    } else if (data.status === 1) {
      fn && fn();
      toast.success(data?.message || "Success", {
        toastId: "changePasswordSuccess",
      });
    }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: ResetData) => resetPassword(values),
    onSuccess(data) {
      handleSuccess(data);
    },
    onError(AxiosError: AxiosError<{ message?: string }>) {
      toast.error(AxiosError.response?.data?.message || "An error occurred", {
        toastId: "changePasswordError",
      });
    },
  });
};
