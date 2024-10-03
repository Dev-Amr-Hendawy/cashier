import { Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "..";
import { useTranslation } from "react-i18next";
import { Card, Clock, WalletMoney } from "iconsax-react";

interface ShiftInfoCardProps {
  type: "start" | "end";
}

export const ShiftInfoCard: React.FC<ShiftInfoCardProps> = ({ type }) => {
  const { t } = useTranslation();
  return (
    <Stack className="container-border-padding " gap={"0.75rem"}>
      <Typography
        variant="h5"
        mb={"4px"}
        color={type === "start" ? "#6EC531" : "#E83E00"}
      >
        {type === "start" ? t("users.startShift") : t("users.endShift")}
      </Typography>
      <IconLabelValueField
        label={t("timing")}
        icon={
          <Clock size={24} color={type === "start" ? "#6EC531" : "#E83E00"} />
        }
        value="11"
      />
      <IconLabelValueField
        label={t("users.cash")}
        icon={<WalletMoney size={24} />}
        value="11"
      />
      <IconLabelValueField
        label={t("users.visa")}
        icon={<Card size={24} />}
        value="11"
      />
    </Stack>
  );
};
