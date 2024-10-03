import { FormControlLabel, styled } from "@mui/material";

export const StyledFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: (prop: string) => prop !== "checked",
})<{ checked: boolean }>(({ theme, checked }) => ({
  border: "2px solid",
  borderRadius: "200px",
  height: "3.5rem",
  padding: "1rem 1.5rem",
  borderColor: checked ? theme.palette.secondary.main : theme.palette.grey[400],
  margin: "0",
  color: theme.palette.grey[600],
  "& .MuiFormControlLabel-label": {
    fontWeight: "600",
    fontSize: "1rem",
    color: checked ? theme.palette.secondary.main : theme.palette.grey[800],
  },
  "&:hover": {
    borderColor: theme.palette.secondary.main,
    "& .MuiFormControlLabel-label": {
      color: theme.palette.secondary.main,
    },
  },
}));
