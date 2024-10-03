import { Stack, styled } from "@mui/material";

export const StyledPaymentDetailsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  height: "calc(100vh - 5.5rem)",
  backgroundColor: "common.white",
  overflow: "auto",
});

export const StyledSuccessBox = styled("div")(({ theme }) => ({
  border: "2px solid",
  borderColor: theme.palette.grey[700],
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2) + " " + theme.spacing(3),
  width: `calc(100% - ${theme.spacing(4)})`,
  margin: "0 auto",
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
}));

export const StyledSummaryHeaderContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3) + " " + theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& svg": {
    cursor: "pointer",
  },
}));

export const StyledPaymentDetailsSummary = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  margin: theme.spacing(3),
}));

export const SummaryContainer = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid white",
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(2),
}));
