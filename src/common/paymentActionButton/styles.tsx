import { ButtonBase, StackProps, styled } from "@mui/material";

interface Props extends StackProps {
  bcgColor: string;
}

export const StyledPaymentActionButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "bcgColor",
})<Props>(({ theme, bcgColor }) => ({
  backgroundColor: bcgColor,
  padding: "1rem 0",
  width: "100%",
  borderRadius: ".75rem",
  height: "100%",
  color: theme.palette.primary.contrastText,
  transition: "all .2s ease-in-out",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& h6": {
    transition: "all .2s ease-in-out",
    // color: theme.palette.grey[300],
  },
  "& svg": {
    color: theme.palette.primary.contrastText,
  },
  // "&:hover": {
  //   cursor: "pointer",
  //   border: `2px solid ${theme.palette.secondary.main}`,
  //   color: theme.palette.secondary.main,
  //   "& h6": {
  //     color: theme.palette.secondary.main,
  //   },
  //   "& svg": {
  //     color: theme.palette.secondary.main,
  //   },
  // },
}));
