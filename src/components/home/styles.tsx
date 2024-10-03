import { styled } from "@mui/material";

export const StyledMainContainer = styled("div")(({ theme }) => ({
  overflowY: "scroll",
  height: "calc(100vh - 15rem)",
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
