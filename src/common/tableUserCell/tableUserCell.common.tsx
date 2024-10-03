import { Stack, Typography } from "@mui/material";
import { MagicStar } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface tableUserCellProps {
  value: string;
  isCard?: boolean;
}

// TODO::recheck
export const TableUserCell: React.FC<tableUserCellProps> = ({
  value,
  isCard,
}) => {
  const { t } = useTranslation();
  return (
    <Stack direction={"row"} gap={"0.5rem"}>
      <Typography variant="body1" color={"secondary"}>
        {isCard ? t("users.form.admin") : value}
      </Typography>
      <MagicStar size={20} color="#6EC531" />
    </Stack>
  );
};
