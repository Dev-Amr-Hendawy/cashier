import { AppBar, Container, styled } from "@mui/material";

export const StyledHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: "var(--background-color)",
  
  color: theme.palette.text.primary,
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
  width: "100%",
  padding:"1rem 0",
  zIndex:3,

  height: "5rem",
  // "@media (max-width: 1441px)": {
  //   height: "87px",
  // },
  // "@media (max-width: 1280px)": {
  //   height: "80px",
  // },
}));

export const StyledLogo = styled("img")({
  width: "160px",
  height: "auto",
  objectFit: "contain",
  cursor: "pointer",
  "@media (max-width: 1441px)": {
    width: "140px",
  },
  "@media (max-width: 1280px)": {
    width: "120px",
  },
});

export const StyledContainer = styled(Container)(() => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
  padding: "0 1rem",
}));
