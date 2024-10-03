import { Grid } from "@mui/material";
import React from "react";
import { StyledContainer } from "./styles";

interface InvoicesLayoutProps {
  rightSide: React.ReactNode;
  leftSide: React.ReactNode;
}

const NormalInvoicesLayout: React.FC<InvoicesLayoutProps> = ({
  rightSide,
  leftSide,
}) => {
  return (
    <StyledContainer container columns={100} spacing={2}>
      <Grid item xs={56}>
        {leftSide}
      </Grid>
      <Grid item xs={44}>
        {rightSide}
      </Grid>
    </StyledContainer>
  );
};

export const InvoicesLayout = React.memo(NormalInvoicesLayout);
