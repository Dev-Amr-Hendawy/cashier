import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledHomeProductsProps {
  columns: 4 | 5;
}

export const StyledHomeProducts = styled(Box, {
  shouldForwardProp: (prop) => prop !== "columns",
})<StyledHomeProductsProps>(({ columns }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: "0.5rem",
  width: "100%",
  justifyContent: "center",
}));

export const StyledMainContainer = styled("section")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: ".25rem",
  padding: "1rem 0.5rem",
}));
