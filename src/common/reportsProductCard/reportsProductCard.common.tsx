import { Stack, Typography } from "@mui/material";
import "./styles.scss";
import { t } from "i18next";
import CountUp from "react-countup";

interface ReportsProductCardProps {
  value: string;
  icon: React.ReactNode;
  title: string;
  date: string;
}

export const ReportsProductCard: React.FC<ReportsProductCardProps> = ({
  value,
  icon,
  title,
  date,
}) => {
  return (
    <Stack className="container-border-padding report-product-card">
      <Stack direction={"row"} justifyContent={"space-between"}>
        {/* icon and title */}
        <Stack direction={"row"} gap={"0.5rem"}>
          {icon}
          <Typography variant="h6" color={"var(--grey-900)"}>
            {t(title)}
          </Typography>
        </Stack>
        {/* product count */}
        <Stack direction={"row"} gap={"4px"}>
          <Typography variant="h6" color={"var(--secondary-main)"}>
            <CountUp start={0} end={Number(value)} duration={4} delay={1.5} />{" "}
          </Typography>
          <Typography variant="h6" color={"var(--grey-900)"}>
            {t("client.product")}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="subtitle2" color={"var(--grey-600)"}>
        {date}
      </Typography>
    </Stack>
  );
};
