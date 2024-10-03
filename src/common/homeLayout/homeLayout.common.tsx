import { Grid } from "@mui/material";
import React from "react";
import { StyledContainer } from "./styles";

interface HomeLayoutProps {
  rightSide: React.ReactNode;
  leftSide: React.ReactNode;
}

const NormalHomeLayout: React.FC<HomeLayoutProps> = ({
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

export const HomeLayout = React.memo(NormalHomeLayout);
