import { Stack, styled } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  padding: "1rem ",
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
}));
