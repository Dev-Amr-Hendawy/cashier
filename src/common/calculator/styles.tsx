import { styled } from "@mui/material";

export const StyledCalculatorContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(5, 1fr)",
  backgroundColor: "var(--background-color)",
  borderRadius: "1rem",
  
  border: `1px solid ${theme.palette.grey[700]}`,
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  // height: "80%",
  gap: theme.spacing(2),
}));
