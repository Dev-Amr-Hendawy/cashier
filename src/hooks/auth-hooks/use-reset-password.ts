import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResetData, resetPassword } from "../../apis";
import { AuthResponseType } from "../../types/types";

export const useResetPassword = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: AuthResponseType) => {
    if (data.status === 0) {
      toast.error(data?.message, {
        toastId: "loginError",
      });
    } else if (data.status === 1) {
      navigate("/login");
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
        toastId: "registerError",
      });
    },
  });
};
