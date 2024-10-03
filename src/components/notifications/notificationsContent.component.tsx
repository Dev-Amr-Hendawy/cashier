import { useState } from "react";

import { Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import { NotificationsSettings, NotificationsView } from "@myCash/components";
import {
  ActiveUserSwitch,
  HeaderWithMoreIcon,
  SecondaryMainLayout,
} from "@myCash/common";

import "./styles.scss";

interface NotificationsContentProps {}

export const NotificationsContent: React.FC<NotificationsContentProps> = () => {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <SecondaryMainLayout title="notifications.title">
      <Stack gap={"1rem"}>
        {/* header */}
        <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"}>
          <Story size={24} color="#232773" />
          <Typography fontSize={20} fontWeight={400} color={"#2D2D2DCC"}>
            {t("notifications.header")}
          </Typography>
        </Stack>
        <ActiveUserSwitch label="notifications.activateNotifications" />
      </Stack>
      <HeaderWithMoreIcon
        title={t("notifications.title")}
        onClick={() => setSettingsOpen(true)}
      />
      <NotificationsSettings
        open={settingsOpen}
        handleClose={() => setSettingsOpen(false)}
      />
      <NotificationsView />
    </SecondaryMainLayout>
  );
};
