import { Sticker } from "iconsax-react";
import { Subscription } from "@myCash/types";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "@myCash/common";

import "./styles.scss";

interface UserSubscriptionCardProps {
  subscription: Subscription;
}

export const UserSubscriptionCard: React.FC<UserSubscriptionCardProps> = ({
  subscription,
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      className="container-border-padding user-subscription-card"
      width={"50vw"}
      gap={"1rem"}
    >
      <IconLabelValueField
        icon={<Sticker size={24} color="#6EC531" />}
        label={`${t("subscriptions.package")} ${
          subscription?.packagePrice || ""
        }/${t("year")}`}
      />
      {/* Content */}
      <Stack gap={"1rem"} padding={"0 2.5rem"}>
        <Typography variant="subtitle2">{`${t("subscriptions.endsAt")} ${
          subscription?.endDate || ""
        }`}</Typography>
        {/* Days remaining */}
        <Stack direction={"row"} gap={"4px"}>
          <Typography variant="body2" color="gray">{`${t(
            "remaining"
          )} `}</Typography>
          <Typography variant="body2" color="primary">
            {subscription?.daysLeft || ""}
          </Typography>
          <Typography variant="body2" color="gray">{`${t(
            "day2"
          )} `}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
