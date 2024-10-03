import { Stack, styled } from "@mui/material";

export const StyledCalculatorInputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.grey[200]}`,
  display: "flex",
  backgroundColor: "var(--background-color)",
  minHeight: theme.spacing(14),
  "& .first-div": {
    padding: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

export const StyledInput = styled(Stack)(({ theme }) => ({
  backgroundColor:"var(--background-color)",
  padding: theme.spacing(1.5) + " " + theme.spacing(1),
  flexDirection: "row",
  alignItems: "center",
  flexGrow: 1,
  borderRadius: theme.spacing(2),
  "& h3": {
    flexGrow: 1,
    textAlign: "center",
  },
}));
