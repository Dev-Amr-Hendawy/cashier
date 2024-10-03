import { Box, Stack, styled } from "@mui/material";

export const StyledModalReturnBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "var(--grey-0)",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  width: "80%",
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

export const StyledModalReturnHeader = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
  padding: "1rem 1.5rem",
}));

interface StyledComponentProps {
  removePadding?: boolean;
}
export const StyledModalReturnContainer = styled("section", {
  shouldForwardProp: (prop) => prop !== "removePadding",
})<StyledComponentProps>(({ theme, removePadding }) => ({
  display: "flex",
  flexDirection: "column",
  padding: removePadding ? "0 0 1.5rem 0" : "1rem 1.5rem 1.5rem 1.5rem",
  gap: "1.5rem",
  "& .MuiButton-root:nth-of-type(2)": {
    backgroundColor: theme.palette.mode === "light" ? "" : "grey",
  },
}));

export const ActionsReturnContainer = styled(Stack)({});
