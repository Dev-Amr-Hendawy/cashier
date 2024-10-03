import { ReactNode } from "react";

import { Stack } from "@mui/system";
import { MagicStar } from "iconsax-react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import "./styles.scss";

interface AdminIconLabelProps {
  label: string;
  icon?: ReactNode;
  value?: string;
  hasBorder?: boolean;
}

export const AdminIconLabel: React.FC<AdminIconLabelProps> = ({
  label,
  icon,
  value,
  hasBorder,
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      className={
        hasBorder
          ? "icon-label-value-container has-border"
          : "icon-label-value-container"
      }
    >
      <Stack>
        {icon}
        <Stack className='admin-label-text'>
          <Typography variant="h6" color="#6EC531">
            {t(label)}
          </Typography>
          <MagicStar size={24} color="#6EC531" />
        </Stack>
      </Stack>
      <Typography variant="h6" color="color.grey[600]">
        {value}
      </Typography>
    </Stack>
  );
};
