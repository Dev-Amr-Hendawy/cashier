import { IconButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "2.5rem",
  height: "2.5rem",
  backgroundColor: `
    ${
      theme.palette.mode === "light"
        ? theme.palette.grey[700]
        : theme.palette.grey[500]
    } !important`,
  "& svg": {
    color: theme.palette.secondary.main,
  },
}));

export const StyledContainer = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  "& form": {
    width: "100%",
  },
});
