import { Stack, Typography } from "@mui/material";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import reportsArrow from "@myCash/assets/icons/reports-arrow.svg";
import CountUp from "react-countup";

interface ReportsArrowedCardProps {
  title: string;
  value: string;
  hasCurrencyTag?: boolean;
}

export const ReportsArrowedCard: React.FC<ReportsArrowedCardProps> = ({
  title,
  value,
  hasCurrencyTag,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="reports-arrow-container">
      {/* data */}
      <Stack gap={"0.5rem"}>
        <Typography fontSize={"1.5rem"} fontWeight={700} color={"secondary"}>
          <CountUp start={0} end={Number(value)} duration={4} delay={1.5} />{" "}
          {` ${hasCurrencyTag ? t("currency") : ""}`}
        </Typography>
        <Typography variant="h6">{t(title)}</Typography>
      </Stack>
      {/* arrow */}
      <Stack>
        <img src={reportsArrow} alt="arrow" />
      </Stack>
    </Stack>
  );
};
