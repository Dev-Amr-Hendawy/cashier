import { useMutation } from "@tanstack/react-query";

import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthResponseType, IBaseApiResponse } from "../../types/types";
import { ForgetPasswordValuesType, forgetPassword } from "../../apis";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleSuccess = (data: AuthResponseType) => {
    const type = searchParams.get("type") || "2";
    if (data.status === 0) {
      toast.error(data?.message, {
        toastId: "forget-password-error",
      });
    } else if (data.status === 1) {
      navigate(
        `?step=2&type=${type}&${type === "2" ? "email" : "phone"}=${
          type === "2" ? data?.data?.email : data?.data?.phone
        }&country_id=${data?.data?.country?.id}`
      );
    }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: ForgetPasswordValuesType) => forgetPassword(values),
    onSuccess(data) {
      handleSuccess(data);
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
