import Button from "../form/Button";
import {
  RootState,
  // clearSubscriptionData,
  // clearSubscriptionState,
  setSubscriptionStep,
} from "@myCash/lib";
import {
  DiscountPromoInput,
  ScrollContainer,
  SecondaryMainLayout,
} from "@myCash/common";
import { Stack } from "@mui/material";
import { SubscriptionsPaymentSummary } from "@myCash/common/subscriptionPaymentSummary";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useAddSubscriptionPayment, useCheckDiscount } from "@myCash/hooks";

interface SubscriptionPaymentProps {}

export const SubscriptionPayment: React.FC<SubscriptionPaymentProps> = () => {
  const { t } = useTranslation();
  const subscription = useSelector((state: RootState) => state.subscription);
  const dispatch = useDispatch();
  const { mutate, isPending } = useAddSubscriptionPayment();
  const { mutate: checkDiscount } = useCheckDiscount();
  const handlePaymentButton = () => {
    mutate({
      device_country_id: subscription.subscriptionPayment.device_id || "",
      package_id: subscription.subscriptionPayment.package_id || "",
      influencer_id: subscription.subscriptionPayment.influencer_id || "",
    });
    // dispatch(clearSubscriptionData());
  };
  return (
    <ScrollContainer>
      <SecondaryMainLayout
        title={t("continuePay")}
        handleBack={() => {
          // dispatch(clearSubscriptionState());
          dispatch(setSubscriptionStep(1));
        }}
      >
        {/* TODO:: recheck for hasMargin */}
        <ScrollContainer hasMargin>
          <Stack gap={"2.75rem"}>
            <Stack gap={"12px"}>
              {/* TODO optimize ya shiko */}
              <SubscriptionsPaymentSummary
                totalPrice={
                  subscription?.subscriptionPayment.finalPrice.toLocaleString() ||
                  "0"
                }
                tax={"0"}
                // tax={subscription?.subscriptionPayment.tax || "0"}
                // discount={subscription?.subscriptionPayment.discount || "0"}
                discount={subscription.subscriptionPayment.discount || "0"}
                initialPrice={subscription?.subscriptionPayment?.price || 0}
              />{" "}
              <DiscountPromoInput
                submitHandler={(v) => checkDiscount(v)}
                helperText="subscriptions.subscriptionHelper"
              />
            </Stack>
            <Button
              text={t("continuePay")}
              onClick={handlePaymentButton}
              loading={isPending}
            />
          </Stack>
        </ScrollContainer>
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
