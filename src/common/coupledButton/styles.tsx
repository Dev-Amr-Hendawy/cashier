import { Button, styled } from "@mui/material";

interface StyledCoupledButtonProps {
  isFocused?: boolean;
  textColor?: "grey" | "primary" | "secondary";
  isErrors?: boolean;
}
export const StyledCoupledButton = styled(Button, {
  shouldForwardProp: (prop: string) =>
    prop !== "isFocused" && prop !== "textColor" && prop !== "isErrors",
})<StyledCoupledButtonProps>(({ theme, isFocused, textColor, isErrors }) => ({
  borderColor: isFocused
    ? theme.palette.primary.main
    : isErrors
    ? theme.palette.error.main
    : theme.palette.grey[100],
  borderRadius: "100px 0px 0px 100px",
  borderWidth: "2px",
  color:
    textColor === "grey"
      ? theme.palette.grey[600]
      : theme.palette.primary.main,
  background: theme.palette.mode === "light" ? "var(--grey-0)" : "black",

  "&.Mui-disabled": {
    borderWidth: "2px",
    borderColor: isFocused
      ? theme.palette.primary.main
      : isErrors
      ? theme.palette.error.main
      : theme.palette.grey[100],
    color: theme.palette.grey[400],
    borderRightColor: "transparent",
    borderRightWidth: "0px",
  },
}));
