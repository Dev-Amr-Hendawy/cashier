import { Badge, IconButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "white",
  padding: "0.5rem",
  border: "3px solid",
  "&:hover": {
    backgroundColor: "white",
  },
  borderColor: theme.palette.primary.main,
  "& .MuiAvatar-root": {
    width: "2.5rem",
    height: "2.5rem",
  },
  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    objectPosition: "center",
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.error.main,
    width: "1rem",
    height: "1rem",
    fontSize: "1rem",
    borderRadius: "50%",
    minWidth: "unset",
  },
}));
StyledBadge.defaultProps = {
  overlap: "circular",
  badgeContent: " ",
  anchorOrigin: { vertical: "top", horizontal: "left" },
};
