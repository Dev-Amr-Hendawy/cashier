import { ButtonBase, styled } from "@mui/material";

export const StyledClientTypeContainer = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
  display: "flex",
  height: "3.5rem",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "100%",
  borderRadius: "500px",
  border: active
    ? `2px solid ${theme.palette.secondary.main}`
    : `2px solid ${theme.palette.grey[100]}`,
  "& h5,svg": {
    color: active ? theme.palette.secondary.main : theme.palette.grey[900],
  },
}));
