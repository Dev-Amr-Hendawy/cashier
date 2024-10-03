import { ButtonBase, styled } from "@mui/material";

type Props = {
  active?: boolean;
};

export const StyledContainer = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "active",
})<Props>(({ theme, active }) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "auto",
  gap: "1rem",
  backgroundColor: theme.palette.grey[500],
  padding: `${theme.spacing(2.25)} ${theme.spacing(3)}`,
  borderRadius: theme.spacing(2),
  justifyContent: "flex-start",
  alignItems: "center",
  border: "1px solid",
  borderColor: active
    ? theme.palette.secondary.main
    : theme.palette.mode === "dark"
    ? theme.palette.grey[900]
    : "",
  cursor: "pointer",
  transition: "all .1s ease-in",
  "&:hover": {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}));
