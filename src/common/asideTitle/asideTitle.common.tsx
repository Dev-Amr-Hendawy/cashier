import { Stack, Typography } from "@mui/material";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import i18n from "@myCash/i18n";

interface AsideTitleProps {
  title: string;
  amount?: string;
  showAll?: boolean;
  onClick?: () => void;
  value?: string | number;
}

export const AsideTitle: React.FC<AsideTitleProps> = ({
  title,
  amount,
  showAll,
  onClick,
  value,
}) => {
  const { t } = useTranslation();
  const dir = i18n.dir();
  return (
    <Stack className="aside-title-container">
      {/* title */}
      <Stack gap={"1rem"}>
        <Typography variant="h6">{t(title)}</Typography>
        {amount && <Typography variant="h6">{`[${amount}]`}</Typography>}
      </Stack>
      {/* show all and value*/}
      {showAll ? (
        <Stack gap={"0.5rem"} onClick={onClick} className="aside-show-all">
          <Typography variant="h6">{t("client.showAll")}</Typography>
          {dir === "rtl" ? (
            <ArrowLeft2 variant="TwoTone" color="var(--grey-900)" size="16" />
          ) : (
            <ArrowRight2 variant="TwoTone" color="var(--grey-900)" size="16" />
          )}
        </Stack>
      ) : (
        value && <Typography variant="h6">{value}</Typography>
      )}
    </Stack>
  );
};
