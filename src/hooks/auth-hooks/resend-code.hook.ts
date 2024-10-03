import { ResendCodeData, resendCodeApi } from "../../apis";

import { IBaseApiResponse, SignUpResponse } from "../../types/types";
import { register as registerHandler } from "../../lib/store/slices/user-slice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

export const useResendCode = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSuccess = (data: SignUpResponse) => {
    if (data.status === 0) {
      toast.error(data?.message || t("error"));
    } else if (data.status === 1) {
      toast.success(t(data?.message || t("payment.success")), {
        toastId: "resendCodeSuccess",
      });
      dispatch(
        registerHandler({
          user: data.data,
          token: data.data.token,
        })
      );
    }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: ResendCodeData) => resendCodeApi(values),
    onSuccess(data) {
      handleSuccess(data);
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
