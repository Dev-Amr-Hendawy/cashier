import { Stack, styled } from "@mui/material";

export const StyledCartSummaryItem = styled(Stack)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0.5),
  "& h6": {
    color: theme.palette.grey[600],
  },
  "& h5": {
    color: theme.palette.primary.main,
  },
}));
