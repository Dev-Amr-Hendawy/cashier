import { Chip, styled } from "@mui/material";

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  flexDirection: "row-reverse",
  boxSizing: "border-box",
  alignItems: "center",
  gap: ".5rem",
  border: "2px solid",
  cursor: "pointer",
  background: "white",
  padding: ".875rem 1.5rem",
  height: "3rem",
  fontSize: "1rem",
  borderRadius: ".875rem",
  minWidth: "unset ",
  borderColor: active ? theme.palette.secondary.main : theme.palette.grey[800],
  color: active ? theme.palette.secondary.main : theme.palette.grey[900],
  fontWeight: 400,
  transition: "all 0.3s ease",
  width: "150px",
  marginTop: "1rem",
  direction: "ltr",

  "& .MuiChip-label": {
    padding: 0,
    scale: active ? "1.1" : "1",
  },
  "& svg": {
    transition: "all 0.3s ease",
    "& path": {
      stroke: active && theme.palette.secondary.main,
      transition: "all 0.3s ease",
    },
  },
  "&:hover": {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    "&  .MuiChip-label": {
      scale: "1.05",
    },
    backgroundColor: theme.palette.grey[200],
    "& svg": {
      "& path": {
        stroke: theme.palette.secondary.main,
      },
    },
  },
}));
