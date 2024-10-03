import { ButtonBase, styled } from "@mui/material";

export const StyledCalculatorBtn = styled(ButtonBase)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  borderRadius: "1rem",
  border: `2px solid ${theme.palette.grey[700]}`,
  backgroundColor: "var(--grey-0)",
  fontSize: "1.5rem",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));
