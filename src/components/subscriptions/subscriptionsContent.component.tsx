import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setSubscriptionPackage,
  setSubscriptionStep,
} from "@myCash/lib";
import {
  Devices,
  Plans,
  SubscriptionPayment,
  SubscriptionMainView,
} from "@myCash/components";

import "./styles.scss";
import { useCalculateSubscription, useGetInfo } from "@myCash/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BackDrop } from "@myCash/common";

interface SubscriptionsContentProps {}

export const SubscriptionsContent: React.FC<SubscriptionsContentProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const subscriptionStep = useSelector(
    (state: RootState) => state.subscription.step
  );
  const { data: userInfo, isSuccess, isRefetching } = useGetInfo();
  const { mutate: calculatePayment, isPending } = useCalculateSubscription();
  // to update the subscription package id in the store
  useEffect(() => {
    dispatch(setSubscriptionPackage(userInfo?.data?.subscription?.package?.id));
  }, [isSuccess, userInfo?.data, dispatch, isRefetching]);
  // to check if user payment is completed to pass to website
  useEffect(() => {
    if (
      userInfo?.data?.paymentStatus === 1 &&
      userInfo?.data?.subscription?.expire !== 1 &&
      pathname === "/supscription-payment"
    ) {
      toast.success("Subscription payment is completed");
      navigate("/");
      return;
    }
  }, [userInfo?.data, pathname, navigate]);
  if (isPending) return <BackDrop open={isPending} />;
  return (
    <>
      {subscriptionStep === 1 && (
        <SubscriptionMainView
          subscription={userInfo?.data?.subscription}
          calculatePayment={(values: { [key: string]: string }) =>
            calculatePayment(values)
          }
        />
      )}
      {subscriptionStep === 2 && <Plans />}
      {subscriptionStep === 3 && (
        <Devices
          handleClick={() => dispatch(setSubscriptionStep(4))}
          calculatePayment={(values: { [key: string]: string }) =>
            calculatePayment(values)
          }
        />
      )}
      {subscriptionStep === 4 && <SubscriptionPayment />}
    </>
  );
};
