import { Stack, styled } from "@mui/material";

export const StyledTextFieldIconLabel = styled(Stack)(() => ({
  flexDirection: "row",
  gap: "0.5rem",
  alignItems: "center",
  "& .MuiFormLabel-root": {
    top: "-3rem",
  },
}));
