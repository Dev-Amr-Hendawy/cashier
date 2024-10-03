import "./styles.scss";

import { ReactNode } from "react";
import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";

interface TotalIconLabelValueFieldProps {
  label: string;
  icon?: ReactNode;
  value?: string | number | ReactNode;
  hasBorder?: boolean;
  fixedLabelValue?: string;
  valueAppendix?: string;
}

export const TotalIconLabelValueField: React.FC<
  TotalIconLabelValueFieldProps
> = ({ label, icon, value, hasBorder, fixedLabelValue, valueAppendix }) => {
  return (
    <Stack
      className={
        hasBorder
          ? "total-icon-label-value-container has-border"
          : "total-icon-label-value-container"
      }
    >
      <Stack>
        {icon}
        <Typography variant="h6" color={"var(--grey-0)"}>{`${label} ${
          fixedLabelValue ? fixedLabelValue : ""
        }`}</Typography>
      </Stack>
      <Box>
        <Typography
          fontWeight="700"
          fontSize="1.5rem"
          color="var(--grey-0)"
          className="iconLabel-value-typography"
        >
          {value}
        </Typography>
        <Typography fontWeight="600" fontSize="1rem" color={"var(--grey-0)"}>
          {valueAppendix}
        </Typography>
      </Box>
    </Stack>
  );
};
