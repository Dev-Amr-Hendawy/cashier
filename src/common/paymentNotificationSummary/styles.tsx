import { Stack, styled } from "@mui/material";

export const PaymentSummaryContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginTop: "auto",
  // padding: theme.spacing(1) + " " + theme.spacing(0),
  gap: theme.spacing(1),
  "& .item": {
    backgroundColor: theme.palette.grey[200],
    minHeight: theme.spacing(10),
    padding: "1rem 1.25rem",
  },  "& .items": {
      gap:"1rem"
  },"& .color-secondary .MuiTypography-root": {
     color:theme.palette.secondary.main 
  },
}));
