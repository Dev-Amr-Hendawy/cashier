import { Stack, styled } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
  padding: "1rem",
  borderTop: `1px solid ${theme.palette.grey[500]}`,
}));
