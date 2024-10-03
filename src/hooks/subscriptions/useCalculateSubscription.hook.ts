import { calculateSubscription } from "@myCash/apis/subscriptions";
import { setSubscriptionPayment } from "@myCash/lib";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const useCalculateSubscription = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      toast.promise(calculateSubscription(values), {
        pending: t("subscriptionCalculateApi"),
      }),
    onSuccess: (data) => {
      dispatch(
        setSubscriptionPayment({
          price: data?.data?.data[0]?.subTotalBeforeDiscount,
          finalPrice: data?.data?.data[0]?.totalPrice,
        })
      );
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "calculate-payment-error",
        });
      } else if (data?.data.status === 1) {
        // toast.success(data?.data?.message || "Success!", {
        //   toastId: "calculate-payment-success",
        // });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
