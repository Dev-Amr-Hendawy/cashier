import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postDiscountCode } from "@myCash/apis";
import { useDispatch } from "react-redux";
import { setSubscriptionInfluencer } from "@myCash/lib";
import { IBaseApiResponse } from "@myCash/types";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useCheckDiscount = (fn?: () => void) => {
  const dispatch = useDispatch();
  const {t}=useTranslation();

  return useMutation({
    mutationFn: (values: { [key: string]: string }) => postDiscountCode(values),
    onSuccess: (data) => {
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "check-discount-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "check-discount-success",
        });

        dispatch(
          setSubscriptionInfluencer({
            id: data?.data?.data?.id,
            discount: data?.data?.data?.discount,
          })
        );
        fn && fn();
      }
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
