import { SignUpData, signUpApi } from "../../apis/auth/signUp.api";

import { AxiosError } from "axios";
import { SignUpResponse } from "../../types/types";
import { changeStep } from "@myCash/lib";
import { register as registerHandler } from "../../lib/store/slices/user-slice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useSignUp = () => {
  const { t } = useTranslation();
  const { step } = useSelector(
    (state: { formStep: { step: number } }) => state.formStep
  );
  const dispatch = useDispatch();
  const handleSuccess = (data: SignUpResponse) => {
    if (data.status === 0) {
      toast.error(data?.message, {
        toastId: "registerError",
      });
      dispatch(changeStep(1));
    } else if (data.status === 1 && data.data?.token) {
      dispatch(
        registerHandler({
          user: data.data,
          token: data.data.token,
          status: data.data.status,
        })
      );
      dispatch(changeStep(step+1));
      toast.success(data.message ||t("signUp.registeredSuccessfully"), {
        toastId: "registerSuccess",
      });
      // navigate("/");
      // dispatch(changeStep(1));
    }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: SignUpData) => signUpApi(values),
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
