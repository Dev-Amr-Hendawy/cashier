import { TextField, styled } from "@mui/material";

interface StyledCoupledTextFieldProps {
  order: string;
  disableNotchedOutline?: boolean;
}
export const StyledCoupledTextField = styled(TextField, {
  shouldForwardProp: (prop: string) =>
    prop !== "order" && prop !== "disableNotchedOutline",
})<StyledCoupledTextFieldProps>(({ theme, order, disableNotchedOutline }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    top: disableNotchedOutline && "-4.5px",
  },
  "&.MuiTextField-root": {
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-1rem",
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius:
      order === "second" ? "0 100rem 100rem 0" : "100rem 0 0 100rem",
    // gap: "1rem",
    paddingLeft: "1.5rem",
    paddingRight: "1rem",
    background: theme.palette.mode === "light" ? "var(--grey-0)" : "black",

    "& fieldset": {
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
      borderTopWidth: "2px",
      borderBottomWidth: "2px",
      borderColor: theme.palette.grey[100],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused svg": {
      color: theme.palette.primary.main,
    },
  },
  maxWidth: "unset",
  borderRadius: order === "second" ? "100rem 0 0 100rem" : "0 100rem 100rem 0",
  width: "100%",

  "& .MuiOutlinedInput-input": {
    height: "1.5rem",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "1rem .75rem",
    //breakpoints
    [theme.breakpoints.down("xl")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.5rem",
    },
  },
  // This will hide the stepper
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button ": {
    WebkitAppearance: "none",
    margin: 0,
  },

  /* Firefox */
  "input[type=number]": {
    MozAppearance: "textfield",
  },
}));
