import { Typography } from "@mui/material";
import { SettingSwitchItem } from "@myCash/common";
import { useColorMode } from "@myCash/hooks";
import { toggleColorMode } from "@myCash/lib";
import { Moon } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

interface SettingsNightSwitchProps {}

export const SettingsNightSwitch: React.FC<SettingsNightSwitchProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLightMode } = useColorMode();
  const root = document.querySelector(":root");
  return (
    <>
      {/* night */}
      <Typography variant="h4">{t("settings.show")}</Typography>
      <SettingSwitchItem
        name={t("settings.night")}
        icon={<Moon size={24} />}
        status={isLightMode ? 0 : 1}
        handleSwitch={() => {
          dispatch(toggleColorMode());
          if (root) {
            !isLightMode
              ? root.classList.remove("dark-mode")
              : root.classList.add("dark-mode");
          }
        }}
      />
    </>
  );
};
