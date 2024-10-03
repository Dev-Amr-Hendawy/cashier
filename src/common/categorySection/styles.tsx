import { Stack, styled } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  padding: ".5rem 0 .5rem 1.5rem",
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
  borderTop: `1px solid ${theme.palette.grey[500]}`,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.common.white
      : theme.palette.grey[100],
}));
