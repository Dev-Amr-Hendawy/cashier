import { useState } from "react";
import { Stack } from "@mui/material";
import { Notification } from "iconsax-react";
import { useTranslation } from "react-i18next";
import {
  ActiveUserSwitch,
  CommonModal,
  CustomRadioGroup,
  IconLabelValueField,
} from "@myCash/common";

interface NotificationsSettingsProps {
  open: boolean;
  handleClose: () => void;
}

export const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title={t("client.settings")}
      handleConfirm={handleClose}
      handleCancel={handleClose}
      handleBackBtn={handleClose}
      handleClose={handleClose}
    >
      <Stack gap={"0.75rem"}>
        <ActiveUserSwitch label="notifications.activateNotifications" />
        <IconLabelValueField
          label="notifications.view"
          icon={<Notification size={24} color="#2D2D2D99" />}
        />
        <CustomRadioGroup
          handleChange={(e) => setValue(e.target.value)}
          inputs={[
            { label: t("notifications.type1"), value: "1" },
            { label: t("notifications.type2"), value: "2" },
            { label: t("notifications.type3"), value: "3" },
          ]}
          value={value}
        />
      </Stack>
    </CommonModal>
  );
};
