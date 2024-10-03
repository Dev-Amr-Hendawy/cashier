import { Stack, styled } from "@mui/material";

export const PaymentTableContainer = styled(Stack)(({ theme }) => ({
  // overflowY: "auto",
  // maxHeight: "40vh",
  padding: theme.spacing(1) + " " + theme.spacing(0),
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.default,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.dark,
  },
}));
