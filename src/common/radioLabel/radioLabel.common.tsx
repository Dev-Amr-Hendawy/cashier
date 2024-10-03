import { FormLabel, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

type RadioLabelProps = {
  title: string;
  icon: ReactNode;
};

export const RadioLabel: React.FC<RadioLabelProps> = ({ title, icon }) => {
  return (
    <FormLabel>
      <Stack direction="row" spacing={2} alignItems="center">
        {icon}
        <Typography variant="h6" color="currentcolor">
          {title}
        </Typography>
      </Stack>
    </FormLabel>
  );
};
