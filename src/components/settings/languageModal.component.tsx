import { useState } from "react";

import { Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import {
  CommonModal,
  CustomRadioGroup,
  IconLabelValueField,
} from "@myCash/common";

interface LanguageModalProps {
  open: boolean;
  handleClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  open,
  handleClose,
}) => {
  const [value, setValue] = useState("");
  const { t, i18n } = useTranslation();
  const handleConfirm = () => {
    i18n.changeLanguage(value);
    handleClose();
  };
  return (
    <CommonModal
      hasActions
      open={open}
      handleClose={handleClose}
      title="settings.language"
      handleConfirm={handleConfirm}
    >
      <Stack className="invoice-type-modal">
        <IconLabelValueField
          label={t("settings.languageHeader")}
          icon={<Story color="#232773" size={24} />}
        />
        <Typography variant="h6" color={"#2D2D2D99"}>
          {t("settings.chooseLanguage")}
        </Typography>
        <CustomRadioGroup
          handleChange={(e) => setValue(e.target.value)}
          inputs={[
            { label: "العربية", value: "ar" },
            { label: "English", value: "en" },
          ]}
          value={value}
        />
      </Stack>
    </CommonModal>
  );
};
