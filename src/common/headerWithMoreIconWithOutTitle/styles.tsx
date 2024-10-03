import { styled } from "@mui/material";

export const StyledSummaryHeaderContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3) + " " + theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& svg": {
    cursor: "pointer",
  },
}));
