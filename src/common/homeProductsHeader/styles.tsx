import { Stack, styled } from "@mui/material";

export const StyledHeaderStack = styled(Stack)(() => ({
  padding: "1rem 1.5rem",
  "& > first-child": {
    flexGrow: 1,
  },
}));
