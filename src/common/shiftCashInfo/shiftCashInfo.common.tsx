import { Stack, Typography } from "@mui/material";
import { Card, WalletMoney } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { OutlinedIcon } from "../../common";

interface ShiftCashInfoProps {
  cash: string;
  visa: string;
}

export const ShiftCashInfo: React.FC<ShiftCashInfoProps> = ({ cash, visa }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Typography variant="subtitle2" color={"grey.600"}>
        {t("beginShift.cashInfo")}
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"8rem"}
      >
        {/* cash */}
        <Stack alignItems={"center"}>
          <OutlinedIcon icon={<WalletMoney size="32" color="#232773" />} />
          <Typography variant="subtitle2" color={"color.black"}>
            {`${t("beginShift.cash")} ${cash} ${t("currency")}`}
          </Typography>
        </Stack>
        {/* visa */}
        <Stack alignItems={"center"}>
          <OutlinedIcon icon={<Card size="32" color="#232773" />} />
          <Typography variant="subtitle2" color={"color.black"}>
            {`${t("beginShift.visa")} ${visa} ${t("currency")}`}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
