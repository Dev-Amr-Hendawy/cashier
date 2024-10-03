import { Stack, styled } from "@mui/material";

export const StyledHeaderContainer = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "0.5rem 1rem",
  justifyContent: "space-between",
  flexDirection: "row",
}));
