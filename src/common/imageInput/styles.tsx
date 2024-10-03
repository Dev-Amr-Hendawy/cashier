import { ButtonBase, styled } from "@mui/material";

export const StyledImageInputContainer = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "3.5rem",
  padding: "0rem 1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: `2px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.mode === "light" ? "" : "black",
  borderRadius: "1.25rem",
  "& input": {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0,
    cursor: "pointer",
  },
}));
