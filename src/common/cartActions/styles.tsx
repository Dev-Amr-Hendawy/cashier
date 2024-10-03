import { styled } from "@mui/material";

export const StyledCartActionsContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[500],
  display: "flex",
  gap: theme.spacing(1),
  flexDirection: "row",
  marginTop: "auto",
  "& .MuiButton-root:nth-of-type(2)": {
    backgroundColor: theme.palette.mode === "light" ? "var(--grey-0)" : "grey",
  },
}));
