import { IconButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "bgcolor" && prop !== "showBorder" && prop !== "disabled",
})<{
  bgcolor?: string;
  iconcolor?: "white" | "black" | "common.white" | "common.black" | string;
  showBorder?: boolean;
  disabled?: boolean;
  shadow?: string;
}>(({ theme, bgcolor, iconcolor, showBorder, disabled, shadow }) => ({
  // TODO: shiko ana 7tyt el margin da 3shan fe class enta 7tttha drbt el donya nb2a nbos 3lyha
  margin: "0 !important",
  fontSize: "2rem",
  cursor: "pointer",
  // TODO: shiko ana 7tyt el borderRaduis da 3shan fe class enta 7tttha
  borderRadius: "50% !important",
  backgroundColor:
    bgcolor === "primary"
      ? theme.palette.primary.main
      : bgcolor === "secondary"
      ? theme.palette.secondary.main
      : bgcolor === "grey"
      ? theme.palette.grey[500]
      : bgcolor === "white"
      ? theme.palette.common.white
      : bgcolor === "transparent"
      ? "transparent"
      : disabled
      ? theme.palette.grey[700]
      : theme.palette.common.white,
  border: showBorder ? `2px solid ${theme.palette.primary.main}` : "none",
  boxShadow: shadow ? shadow : "none",
  "&:hover": {
    backgroundColor:
      bgcolor === "primary"
        ? theme.palette.primary.dark
        : bgcolor === "secondary"
        ? theme.palette.secondary.dark
        : bgcolor === "grey"
        ? theme.palette.grey[600]
        : bgcolor === theme.palette.common.white
        ? theme.palette.grey[600]
        : disabled
        ? theme.palette.grey[700]
        : theme.palette.common.white,
  },
  "& svg": {
    color: iconcolor || theme.palette.grey[200],
    fill: iconcolor || theme.palette.grey[200],
    // width: "100%",
    // height: "100%",
  },
  "& .Mui-disabled": {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[200],
  },
}));

export const StyledIconButtonSquare = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "bgcolor" && prop !== "showBorder" && prop !== "disabled",
})<{
  bgcolor?: string;
  iconcolor?: "white" | "black" | "common.white" | "common.black" | string;
  showBorder?: boolean;
  disabled?: boolean;
  shadow?: string;
}>(({ theme, bgcolor, iconcolor, showBorder, disabled, shadow }) => ({
  // TODO: shiko ana 7tyt el margin da 3shan fe class enta 7tttha drbt el donya nb2a nbos 3lyha
  margin: "0 !important",
  fontSize: "2rem",
  cursor: "pointer",
  // TODO: shiko ana 7tyt el borderRaduis da 3shan fe class enta 7tttha
  borderRadius: "1rem !important",
  backgroundColor:!showBorder?
    bgcolor === "primary"
      ? theme.palette.primary.main
      : bgcolor === "secondary"
      ? theme.palette.secondary.main
      : bgcolor === "grey"
      ? theme.palette.grey[500]
      : bgcolor === "white"
      ? theme.palette.common.white
      : bgcolor === "transparent"
      ? "transparent"
      : disabled
      ? theme.palette.grey[700]
      : theme.palette.common.white:"none",
  border: showBorder
    ? `2px solid ${
        bgcolor === "primary"
          ? theme.palette.primary.main
          : bgcolor === "secondary"
          ? theme.palette.secondary.main
          : bgcolor === "grey"
          ? theme.palette.grey[500]
          : bgcolor === "white"
          ? theme.palette.common.white
          : bgcolor === "transparent"
          ? "transparent"
          : disabled
          ? theme.palette.grey[700]
          : theme.palette.primary.main
      }`
    : "none",
  boxShadow: shadow ? shadow : "none",
  "&:hover": {
    backgroundColor:!showBorder?
      bgcolor === "primary"
        ? theme.palette.primary.dark
        : bgcolor === "secondary"
        ? theme.palette.secondary.dark
        : bgcolor === "grey"
        ? theme.palette.grey[600]
        : bgcolor === theme.palette.common.white
        ? theme.palette.grey[600]
        : disabled
        ? theme.palette.grey[700]
        : theme.palette.common.white:"none",
  },
  "& svg": {
    color: iconcolor || theme.palette.grey[200],
    fill: iconcolor || theme.palette.grey[200],
    // width: "100%",
    // height: "100%",
  },
  "& .Mui-disabled": {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[200],
  },
}));
