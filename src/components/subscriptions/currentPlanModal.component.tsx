import { Stack } from "@mui/material";
import { CommonModal, SubscriptionPlanCard } from "@myCash/common";
import {
  RootState,
  setSubscriptionDevice,
  setSubscriptionPackage,
  setSubscriptionStep,
} from "@myCash/lib";
import { Subscription } from "@myCash/types";
import { useDispatch, useSelector } from "react-redux";

interface CurrentPlanModalProps {
  open: boolean;
  handleClose: () => void;
  currentSubscription: Subscription;
  calculatePayment: (values: { [key: string]: string }) => void;
}

export const CurrentPlanModal: React.FC<CurrentPlanModalProps> = ({
  open,
  handleClose,
  currentSubscription,
  calculatePayment,
}) => {
  const dispatch = useDispatch();
  const subscription = useSelector((state: RootState) => state.subscription);
  const { user } = useSelector((state: RootState) => state.user);
  const isCompletedPayment = user?.paymentStatus === 1;
  const handleRenewClick = () => {
    dispatch(setSubscriptionPackage(currentSubscription?.package?.id));
    !isCompletedPayment &&
      dispatch(setSubscriptionDevice(user?.subscription?.device?.id));
    calculatePayment({
      package_id: subscription.subscriptionPayment?.package_id || "",
      device_country_id: user?.subscription?.device?.id.toLocaleString() || "",
    });
    // dispatch(
    //   setSubscriptionPayment({
    //     price:
    //       // Number(subscription.currentSubscription.devicePrice) +
    //       Number(subscription.currentSubscription.packagePrice),
    //     tax: Number(subscription.currentSubscription.taxPrice),
    //     discount: currentSubscription.discountPrice,
    //     finalPrice: currentSubscription.packagePrice,
    //     package_id: subscription?.currentSubscription?.package.id || "",
    //     // device_id: subscription?.currentSubscription?.device?.id || "",
    //     device_id: "",
    //   })
    // );
    dispatch(setSubscriptionStep(4));
    // mutate({
    //   device_country_id: subscription.subscriptionPayment.device_id || "",
    //   package_id: subscription.subscriptionPayment.package_id || "",
    // });
  };
  return (
    <CommonModal
      hasActions={false}
      open={open}
      title=""
      handleClose={handleClose}
    >
      <Stack padding={"2rem 0"} alignItems={"center"} justifyContent={"center"}>
        <SubscriptionPlanCard
          handleClick={handleRenewClick}
          isCurrent
          buttonName="subscriptions.renewSubscription"
          finalPrice={currentSubscription?.packagePrice || ""}
          id={currentSubscription?.id}
          desc_ar={currentSubscription?.package?.desc_ar || ""}
          desc_en={currentSubscription?.package?.desc_en || ""}
          name_ar={"الباقة الحالية"}
          name_en={"Current Plan"}
        />
      </Stack>
    </CommonModal>
  );
};
