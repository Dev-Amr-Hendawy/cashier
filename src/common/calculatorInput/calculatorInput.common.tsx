import { Stack, Typography } from "@mui/material";
import { StyledCalculatorInputContainer } from "./styles";
import React from "react";

interface CalculatorInputProps {
  children: React.ReactNode;
}
export const CalculatorInput: React.FC<CalculatorInputProps> = ({
  children,
}) => {
  return (
    <StyledCalculatorInputContainer>
      <Stack className="first-div">
        <Typography variant="h5" color="grey.400">
          المبلغ
        </Typography>
        <Typography variant="h5" color="grey.600">
          Amount
        </Typography>
      </Stack>
      {children}
    </StyledCalculatorInputContainer>
  );
};
