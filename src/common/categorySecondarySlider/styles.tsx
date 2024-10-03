import { Stack, styled } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  overflow: "hidden",
}));

export const StyledSliderContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  paddingBottom: theme.spacing(2),
}));
