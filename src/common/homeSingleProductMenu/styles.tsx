import { Menu, MenuItem, styled } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontWeight: 700,
  fontSize: "1rem",
  lineHeight: 1,
  display: "flex",
  gap: ".5rem",
  "&::": {
    borderBottom: `1px solid ${theme.palette.grey[900]}`,
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1),
  borderRadius: "1rem !important",
  "& .MuiPaper-root": {
    borderRadius: "1rem !important",
    width: "10rem",
    backgroundColor: "var(--background-color)",
  },
}));
