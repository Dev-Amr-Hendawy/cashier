import { ButtonBase, Stack, styled, StackProps } from "@mui/material";

interface Props extends StackProps {
  active?: boolean;
}

export const StyledPaymentTypeContainer = styled(
  (props) => <ButtonBase component={Stack} {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "active",
  }
)<Props>(({ theme, active }) => ({
  backgroundColor: "var(--background-color)",
  padding: "1rem 0",
  width: "100%",
  borderRadius: ".75rem",
  height: "100%",
  border: active
    ? `2px solid ${theme.palette.secondary.main}`
    : `2px solid ${theme.palette.grey[500]}`,
  color: active ? theme.palette.secondary.main : theme.palette.grey[800],
  transition: "all .2s ease-in-out",
  "& h6": {
    transition: "all .2s ease-in-out",
    color: active ? theme.palette.secondary.main : theme.palette.grey[800],
  },
  "& svg": {
    color: active ? theme.palette.secondary.main : theme.palette.grey[800],
  },
  "&:hover": {
    cursor: "pointer",
    border: `2px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    "& h6": {
      color: theme.palette.secondary.main,
    },
    "& svg": {
      color: theme.palette.secondary.main,
    },
  },
}));
