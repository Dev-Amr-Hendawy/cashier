import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SubscriptionPaymentSummarySignUp } from "@myCash/common";

import Button from "@myCash/components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeStep, clearSubscriptionPayment, RootState } from "@myCash/lib";
import {
  useCalculateSubscription,
  useCheckDiscount,
  useGetInfo,
  usePaymentLink,
} from "@myCash/hooks";
import { useEffect } from "react";
import AuthStepsLayout from "./AuthStepsLayout";
import NewLanguageButton from "@myCash/components/ui/NewLanguageButton";
import NewBackButtonV2 from "@myCash/components/ui/NewBackButtonV2";
import { useNavigate } from "react-router-dom";
import { getItemWithExpiry } from "@myCash/utils/helpers/storeLocalStorage";

interface RegisterPaymentProps {}

export const RegisterPayment: React.FC<RegisterPaymentProps> = (props) => (
  <AuthStepsLayout component={<RegisterPaymentStepForm {...props} />} />
);

export const RegisterPaymentStepForm: React.FC<RegisterPaymentProps> = () => {
  const { t } = useTranslation();
  const { step } = useSelector(
    (state: { formStep: { step: number } }) => state.formStep
  );
  const subscription = useSelector((state: RootState) => state.subscription);
  const { mutate: getSubscription, isPending: isPendingSubscription } =
    useCalculateSubscription();
  const { mutate, isPending: paymentPending } = usePaymentLink();
  const { mutate: checkDiscount } = useCheckDiscount();
  const { data } = useGetInfo();
  const navigate = useNavigate();
  const handlePaymentButton = () => {
    mutate({
      package_id: subscription.subscriptionPayment?.package_id || "",
      device_country_id: subscription.subscriptionPayment?.device_id || "",
      influencer_id: subscription.subscriptionPayment?.influencer_id || "",
    });
  };
  const dispatch = useDispatch();
  const user_ID = useSelector((state: RootState) => state.user.user?.id);
  useEffect(() => {

    if (step === 5) {

    
      const handleSubmit = async () => {
        getSubscription({
          package_id: subscription.subscriptionPayment.package_id
            ? `${subscription.subscriptionPayment.package_id}`
            : getItemWithExpiry("package_id",String(user_ID))
            ? `${getItemWithExpiry("package_id",String(user_ID))}`
            : "",
          device_country_id: subscription.subscriptionPayment.device_id
            ? `${subscription.subscriptionPayment.device_id}`
            : getItemWithExpiry("device_id",String(user_ID))
            ? `${getItemWithExpiry("device_id",String(user_ID))}`
            : "",
        });
      };
      if (
        !subscription?.subscriptionPayment.finalPrice ||
        subscription?.subscriptionPayment.finalPrice === 0
      ) {
        handleSubmit();
      }
    }
  }, []);
  useEffect(() => {
    if (data?.data?.paymentStatus === 1) {
      dispatch(clearSubscriptionPayment());
      dispatch(changeStep(1));
      localStorage.removeItem("device_id");
      localStorage.removeItem("package_id");
      localStorage.removeItem("user_id");
      navigate("/complete-system-info");
    }
  }, [data]);

  return (
    <Stack spacing={5} width="clamp(25rem, 50vw, 70rem)">
      <NewLanguageButton position="absolute" />
      <NewBackButtonV2
        onClick={() => {
          dispatch(changeStep(4));
        }}
      />
      <Stack gap={"12px"}>
        <SubscriptionPaymentSummarySignUp
          totalPrice={
            subscription?.subscriptionPayment.finalPrice.toLocaleString() || "0"
          }
          tax={"0"}
          // tax={subscription?.subscriptionPayment.tax || "0"}
          // discount={subscription?.subscriptionPayment.discount || "0"}
          discount={subscription.subscriptionPayment.discount || "0"}
          initialPrice={subscription?.subscriptionPayment?.price || 0}
          submitHandler={(v) => checkDiscount(v)}
          helperText="subscriptions.subscriptionHelper"
        />
      </Stack>
      <Button
        text={t("continuePay")}
        onClick={handlePaymentButton}
        loading={paymentPending || isPendingSubscription}
      />
    </Stack>
  );
};
