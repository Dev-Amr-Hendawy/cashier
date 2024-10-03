import { useState } from "react";

import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HeaderWithMoreIcon, SecondaryMainLayout } from "@myCash/common";
import {
  SubscriptionsSettings,
  UserSubscriptionCard,
} from "@myCash/components";
import { Subscription } from "@myCash/types";
import { useLocation } from "react-router-dom";

interface SubscriptionMainViewProps {
  subscription: Subscription;
  calculatePayment: (values: { [key: string]: string }) => void;

}

export const SubscriptionMainView: React.FC<SubscriptionMainViewProps> = ({
  subscription,
  calculatePayment
}) => {
  const { t } = useTranslation();
  const [openSettings, setOpenSettings] = useState(false);
  const { pathname } = useLocation();
  return (
    <Stack margin={pathname === "supscription-payment" ? "0 25%" : "0"}>
      <SecondaryMainLayout title="subscriptions.title" removePadding>
        <Box className="recent-subscription-title">
          <HeaderWithMoreIcon
            title={t("subscriptions.recent")}
            onClick={() => setOpenSettings(true)}
          />
          <UserSubscriptionCard subscription={subscription} />
          <SubscriptionsSettings
            open={openSettings}
            handleClose={() => setOpenSettings(false)}
            currentSubscription={subscription}
            calculatePayment={(values:{[key:string]:string})=>calculatePayment(values)}
          />
        </Box>
      </SecondaryMainLayout>
    </Stack>
  );
};
