import { Grid, styled } from "@mui/material";

export const StyledContainer = styled(Grid)(({ theme }) => ({
  "& > :nth-of-type(2)": {
    backgroundColor: theme.palette.grey[500],
  },
}));
