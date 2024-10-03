import { Divider, styled } from "@mui/material";

export const StyledInvoiceContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "borderless",
})<{ borderless: boolean }>(({ theme, borderless }) => ({
  backgroundColor: "#fff",
  border: "2px solid",
  borderColor: borderless ? "transparent" : "#2D2D2D1A",
  borderRadius: theme.spacing(1.5),
  width: "100%",
  height: "100%",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& img": {
    width: theme.spacing(20),
    height: "auto",
    objectFit: "contain",
    margin: "0 auto",
  },
  "@media print": {
    border: "none",
    padding: 0,
    width: "60%",
    "& p": {
      fontSize: "9px",
    },
    "& h5": {
      fontSize: "9px",
    },
    "& h6": {
      fontSize: "9px",
    },
    "& img": {
      width: "60%",
      margin: "0",
    },
  },
}));

export const StyledSeparator = styled("div")(() => ({
  width: "100%",
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  width: `calc(100% + ${theme.spacing(6)})`,
  margin: `0 -${theme.spacing(3)}`,
  // backgroundColor: theme.palette.grey[700],
  backgroundColor: "#2D2D2D1A",
}));

export const StyledTableHeader = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1.25fr 1fr 1fr 1fr",
}));

export const StyledTableItem = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1.25fr 1fr 1fr 1fr",
}));

export const SummaryGrid = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
}));

export const QrCodesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& svg": {
    width: theme.spacing(15),
    height: "auto",
    margin: "1rem 0 0",
  },
  "@media print": {
    // flexDirection: "column",
    "& svg": {
      width: theme.spacing(5),
    },
  },
}));
