import { useMutation } from "@tanstack/react-query";
import { IBaseApiResponse, SignUpResponse } from "../../types/types";
import { ResendCodeData, resendCodeApi } from "../../apis";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setConfirmStep } from "@myCash/lib";
import { AxiosError } from "axios";

export const useResendOtp = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const handleSuccess = (data: SignUpResponse) => {
    if (data?.status === 0) {
      toast.error(data?.message, {
        toastId: "edit-code-error",
      });
    } else if (data.status === 1) {
      toast.success(t(data?.message || t("payment.success")), {
        toastId: "resendCodeSuccess",
      });
      // dispatch(setConfirmStep("check-type"));
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
