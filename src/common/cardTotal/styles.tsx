import { Stack, styled } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
  padding: "1rem 1.25rem",
  backgroundColor: theme.palette.grey[200],
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
}));
