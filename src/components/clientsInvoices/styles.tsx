import { styled } from "@mui/material";

export const StyledPadding = styled("div")(({ theme }) => ({
  padding: theme.spacing(2) + " " + theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
export const SliderContainer = styled("div")(() => ({
  width: "100%",
  overflow: "hidden",
}));
export const StyledRightSideContainer = styled("aside")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.common.white,
  height:"100%",
 display:"flex",
 flexDirection:"column",
 justifyContent:"center",
 alignItems:"center",

  padding:"0rem 2rem",
  width: "calc(100% - 1rem)",
}));
export const InvoiceTypeContainer = styled("div")(() => ({
backgroundColor:"var(--primary-primary50)",
display:"flex",
alignItems:"center",
gap:"0.325rem",
padding:"0.25rem 1rem",
borderRadius:"21rem"

}));