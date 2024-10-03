import { useState } from "react";

import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSubscriptionStep } from "@myCash/lib";
import { Repeat, Simcard2, Sticker } from "iconsax-react";
import { CommonModal, InvoiceSettingItem } from "@myCash/common";
import { CurrentPlanModal, RenewSubscriptionModal } from "@myCash/components";
import { Subscription } from "@myCash/types";

interface SubscriptionsSettingsProps {
  open: boolean;
  handleClose: () => void;
  currentSubscription: Subscription;
  calculatePayment: (values: { [key: string]: string }) => void;
}

export const SubscriptionsSettings: React.FC<SubscriptionsSettingsProps> = ({
  open,
  handleClose,
  currentSubscription,
  calculatePayment,
}) => {
  const { t } = useTranslation();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [renewOpen, setRenewOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <CommonModal
      open={open}
      title={t("client.settings")}
      handleClose={() => handleClose()}
      hasActions={false}
    >
      <Stack gap={"0.75rem"}>
        <InvoiceSettingItem
          icon={<Sticker />}
          id={"details"}
          name={t("subscriptions.details")}
          onClick={() => setDetailsOpen(true)}
        />
        <InvoiceSettingItem
          icon={<Repeat />}
          id={"renew"}
          name={t("subscriptions.renew")}
          onClick={() => {
            setRenewOpen(true);
          }}
        />
        <InvoiceSettingItem
          icon={<Simcard2 />}
          id={"change"}
          name={t("subscriptions.change")}
          onClick={() => {
            dispatch(setSubscriptionStep(2));
            handleClose();
          }}
        />
      </Stack>
      <CurrentPlanModal
        open={detailsOpen}
        handleClose={() => {
          setDetailsOpen(false);
        }}
        currentSubscription={currentSubscription}
        calculatePayment={(values:{[key:string]:string})=>calculatePayment(values)}
      />
      <RenewSubscriptionModal
        open={renewOpen}
        handleClose={() => {
          setRenewOpen(false);
        }}
        calculatePayment={(values:{[key:string]:string})=>calculatePayment(values)}
      />
    </CommonModal>
  );
};
