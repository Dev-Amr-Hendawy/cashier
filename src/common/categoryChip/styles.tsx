import { Chip, styled } from "@mui/material";

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
  border: "2px solid",
  cursor: "pointer",
  background: "common.white",
  padding: "0 1rem",
  height: "3rem",
  fontSize: "1rem",
  borderRadius: "500px",
  minWidth: "110px",
  borderColor: active ? theme.palette.secondary.main : theme.palette.grey[800],
  color: active ? theme.palette.secondary.main : theme.palette.grey[900],
  fontWeight: active ? 600 : 400,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    fontWeight: 600,
    backgroundColor: theme.palette.grey[100],
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "140px",
  },
  [theme.breakpoints.up("xl")]: {
    minWidth: "180px",
  },
}));
