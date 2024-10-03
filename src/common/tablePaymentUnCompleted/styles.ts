import { styled } from "@mui/material";

interface StyledTablePaymentUnCompletedProps {}

export const StyledTablePaymentUnCompleted = styled(
  "div"
)<StyledTablePaymentUnCompletedProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6.25rem",
  textAlign: "center",
  width:"9.625rem",
  // height: "2rem",
  padding: "0.5rem 1rem",
  backgroundColor: theme.palette.warning.light,
  color: "#fff",
  fontSize: "0.75rem",
  fontWeight: 600,
}));
