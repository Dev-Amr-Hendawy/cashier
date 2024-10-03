import "./styles.scss";

import { ReactNode } from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

interface IconLabelValueFieldProps {
  label: string;
  icon?: ReactNode;
  value?: string | number | ReactNode;
  hasBorder?: boolean;
  fixedLabelValue?: string;
  className?: string;
}

export const IconLabelValueField: React.FC<IconLabelValueFieldProps> = ({
  label,
  icon,
  value,
  hasBorder,
  fixedLabelValue,
  className,
}) => {
  return (
    <Stack
      className={`${
        hasBorder
          ? "icon-label-value-container has-border"
          : "icon-label-value-container"
      } ${className ?? ""}`}
    >
      <Stack>
        {icon}
        <Typography variant="h6">{`${label} ${
          fixedLabelValue ? fixedLabelValue : ""
        }`}</Typography>
      </Stack>
      <Typography
        variant="h6"
        color="color.grey[600]"
        className="iconLabel-value-typography"
      >
        {value}
      </Typography>
    </Stack>
  );
};
