import { Stack, TextField, styled } from "@mui/material";

export const CalculatorSideContainer = styled("div")(({ theme }) => ({
  // gridColumn: "1 / span 3",
  // width: "100%",
  // height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  padding: theme.spacing(2),
}));

export const StyledMainSide = styled("div")(({ theme }) => ({
  // gridColumn: "4 / span 9",
  // width: "100%",
  // height: "calc(100vh - 100px)",
  backgroundColor: "common.white",
  // display: "flex",
  // flexDirection: "column",
  padding: theme.spacing(2) + " " + theme.spacing(0),
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  // gridTemplateRows: "repeat(9,1fr)",
  // overflowY: "auto",
}));

export const StyledCalculatorTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "1rem",
    border: `2px solid ${theme.palette.grey[700]}`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  // hide arrows for type number
  /* Chrome, Safari, Edge, Opera */
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  /* Firefox */
  " input[type=number]": {
    " -moz-appearance": "textfield",
  },
}));

export const StyledPaymentModalContent = styled(Stack)(() => ({
  "& .MuiFormLabel-root": {
    "& .MuiTypography-root": {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
  },
}));

export const StyledDoubleCalculatorContainer = styled(Stack)(() => ({
  flexDirection: "row",
  gap: "0.5rem",
  alignItems: "flex-end",
  width: "100%",
  padding: "2.25rem 0.5rem 1.25rem 0.5rem",
  borderRadius: "1rem",
  border: "1px solid #2D2D2D0D",
  backgroundColor: "var(--grey-100)",
  minHeight: "130px",
}));
