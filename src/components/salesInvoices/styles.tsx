import { styled } from "@mui/material";

export const StyledPadding = styled("div")(({ theme }) => ({
  padding: theme.spacing(2) + " " + theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
