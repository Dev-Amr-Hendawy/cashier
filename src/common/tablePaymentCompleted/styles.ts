import { Stack, styled } from "@mui/material";

interface StyledTablePaymentCompletedProps {}

export const StyledTablePaymentCompleted = styled(
  Stack
)<StyledTablePaymentCompletedProps>(({ theme }) => ({
  display: "flex",
  width:"9.625rem",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6.25rem",
  textAlign: "center",
  // height: "2rem",
  padding: "0.5rem 1rem",
  backgroundColor: theme.palette.secondary.darker,
  color: "#fff",
  fontSize: "0.75rem",
  fontWeight: 600,
}));
