import { styled } from "@mui/material";

export const StyledPaymentContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: "1rem",
  height: "calc(100vh - 100px)",
  backgroundColor: "#F5F5F5",
});
