import { Grid, styled } from "@mui/material";

export const StyledContainer = styled(Grid)(() => ({
  "& > :nth-of-type(2)": {
    backgroundColor:"var(--background-color-secondary)",
  },
}));
