import { Chip, Stack, Typography } from "@mui/material";
import "./styles.scss";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

interface ReportSalesCardProps {
  value?: string;
  icon: React.ReactNode;
  title: string;
  appendix: string;
  hideChip?: boolean;
}

export const ReportSalesCard: React.FC<ReportSalesCardProps> = ({
  value,
  icon,
  title,
  appendix,
  hideChip,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="container-border-padding report-sales-card">
      <Stack direction={"row"} justifyContent={"space-between"}>
        {/* icon and title */}
        <Stack direction={"row"} gap={"0.5rem"}>
          {icon}
          <Typography variant="h6" >
            {t(title)}
          </Typography>
        </Stack>
        {/* number chip */}
        {!hideChip ? <Chip label={value} /> : null}
      </Stack>
      <Typography variant="subtitle2" color={"#2D2D2D"} fontWeight={600} >
        <CountUp start={0} end={Number(appendix)} duration={4} delay={1.5} />{" "}
        {t("currency")}
      </Typography>
    </Stack>
  );
};
