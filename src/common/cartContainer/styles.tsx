import { styled } from "@mui/material";

export const StyledRightSideContainer = styled("aside")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.common.white,
  height: "calc(100vh - 10.5rem)",
  width: "calc(100% - 1rem)",
  borderTopLeftRadius: "1.25rem",
  borderTopRightRadius: "1.25rem",
  marginTop: "1rem",
  paddingBottom: "1rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.default, // change this to match your theme
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main, // change this to match your theme
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.dark, // change this to match your theme
  },
}));
export const CartLogo = styled("img")({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%,-50%)",
});
