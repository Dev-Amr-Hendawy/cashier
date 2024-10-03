import { Stack, Typography } from "@mui/material";
import "./styles.scss";
import { useTranslation } from "react-i18next";

interface SalesCardProps {
  title: string;
  value: string;
}

export const SalesCard: React.FC<SalesCardProps> = ({ title, value }) => {
  const { t } = useTranslation();
  return (
    <Stack className="sales-card">
      <Typography variant="h5" color={"rgba(45, 45, 45, 0.4)"}>
        {t(title)}
      </Typography>
      <Stack>
        <Typography fontWeight="700" fontSize="24px">
          {value}
        </Typography>
        <Typography fontWeight="500" fontSize="24px">
          {t("currency")}
        </Typography>
      </Stack>
    </Stack>
  );
};
