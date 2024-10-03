import { Box, Stack, styled } from "@mui/material";

export const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "var(--grey-0)",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  width: 850,
  // border: "2px solid #000",
  // boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  borderRadius: "1.25rem",
  maxHeight: "95vh",
  overflowY: "auto",

  //scrollbar
  "&::-webkit-scrollbar": {
    width: "2px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
    margin: "24px 0",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const StyledModalHeader = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
  padding: "1rem 1.5rem",
  borderRadius: " 12px 12px 0px 0px",
  boxShadow: "2px 1px 13px 0px rgba(0, 0, 0, 0.08)",
}));

interface StyledComponentProps {
  removePadding?: boolean; haveExtraPadding?: boolean;
}
export const StyledModalMainContainer = styled("section", {
  shouldForwardProp: (prop) => prop !== "removePadding",
})<StyledComponentProps>(({ theme, removePadding,haveExtraPadding }) => ({
  display: "flex",
  flexDirection: "column",
  padding: removePadding ? "0 0 1.5rem 0" :haveExtraPadding? "4rem 3rem":"1rem 1.5rem 1.5rem 1.5rem",
  gap: haveExtraPadding?"3rem":"1.5rem",
  "& .MuiButton-root:nth-of-type(2)": {
    backgroundColor: theme.palette.mode === "light" ? "" : "grey",
  },
}));

export const ActionsContainer = styled(Stack)({});
