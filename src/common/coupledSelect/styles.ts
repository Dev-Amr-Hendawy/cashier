import { TextField, styled } from "@mui/material";

interface StyledCoupledTextFieldProps {
  order: string;
}
export const StyledCoupledSelectTextField = styled(TextField, {
  shouldForwardProp: (prop: string) => prop !== "order",
})<StyledCoupledTextFieldProps>(({ theme, order }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: order === "second" ? "0 100rem 100rem 0" : "100rem 0 0 100rem",
    // gap: "1rem",
    paddingLeft: "1.5rem",
    paddingRight: "1rem",
    "& fieldset": {
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
      borderTopWidth: "2px",
      borderBottomWidth: "2px",
      borderColor: theme.palette.grey[100],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
    "&.Mui-focused svg": {
      color: theme.palette.secondary.main,
    },
    "& .MuiSelect-outlined": {
      color: "grey",

      "&:focus": {
        color: "#6EC531",
      },
    },
    "& .MuiPaper-root": {
      borderRadius: "0",
    },
  },
  maxWidth: "unset",
  borderRadius: order === "second" ? "100rem 0 0 100rem" : "0 100rem 100rem 0",
  width: "100%",
  "& .MuiOutlinedInput-input": {
    height: "1.5rem !important",
    minHeight: "1.5rem !important",
    fontWeight: 600,
    fontSize: "1.5rem",
    padding: "1rem .75rem",
    textAlign: "center",
    //breakpoints
    [theme.breakpoints.down("xl")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.5rem",
    },
  },
}));

export const MenuStyles = {
  "& .MuiPaper-root": {
    borderRadius: "20px",
    backgroundColor: "#FFF",
    padding: "1rem",
    "& .MuiList-root": {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    "& .MuiButtonBase-root": {
      backgroundColor: "rgba(45, 45, 45, 0.05)",
      borderRadius: "15px",
      "&:hover": {
        backgroundColor: "rgba(45, 45, 45, 0.1)",
      },
      "&.Mui-disabled": {
        background: "none",
      },
    },
  },
};
