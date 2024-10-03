import { Stack, Typography } from "@mui/material";
import "./styles.scss";
import { Eye } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface TableShowReportProps {
  handleClick: (data: unknown) => void;
}

export const TableShowReport: React.FC<TableShowReportProps> = ({
  handleClick,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="table-show-report" onClick={handleClick}>
      <Eye color="var(--primary-main)" size={16} />
      <Typography variant="subtitle2" color="var(--primary-main)">
        {t("reports.showReport")}
      </Typography>
    </Stack>
  );
};
