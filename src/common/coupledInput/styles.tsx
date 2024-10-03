import { styled } from "@mui/material";

export const StyledContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "gridStyle",
})<{ gridStyle?: string }>(({ theme, gridStyle }) => ({
  display: "grid",
  gridTemplateColumns: gridStyle ? gridStyle : "1.5fr 4fr",
  width: "100%",
  paddingBottom: theme.spacing(1),
  "& .MuiFormLabel-root": {
    top: "-3rem",
  },
}));
