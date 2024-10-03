import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface BranchStatusCellProps {
  value: number;
  isMain: number;
}

export const BranchStatusCell: React.FC<BranchStatusCellProps> = ({
  value,
  isMain,
}) => {
  const { t } = useTranslation();
  return (
    <Typography
      variant="subtitle2"
      fontWeight={"600 !important"}
      color={isMain === 1 ? "#232773" : "#2D2D2DCC"}
    >
      {value === 1
        ? isMain === 1
          ? t("default")
          : t("active")
        : t("inactive")}
    </Typography>
  );
};
