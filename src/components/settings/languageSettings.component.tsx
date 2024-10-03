import { Typography } from "@mui/material";
import { InvoiceSettingItem } from "@myCash/common";
import { LanguageSquare } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageModal } from "@myCash/components";

interface LanguageSettingsProps {}

export const LanguageSettings: React.FC<LanguageSettingsProps> = () => {
  const { t } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState(false);
  return (
    <>
      <Typography variant="h4">{t("settings.language")}</Typography>
      <InvoiceSettingItem
        name={t("settings.language")}
        icon={<LanguageSquare size={24} />}
        hasArrow
        onClick={() => setLanguageOpen(true)}
      />
      <LanguageModal
        open={languageOpen}
        handleClose={() => setLanguageOpen(false)}
      />
    </>
  );
};
