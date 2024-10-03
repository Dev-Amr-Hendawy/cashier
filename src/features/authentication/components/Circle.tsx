import { styled } from "@mui/material";

const Circle = styled("div")(({ theme }) => ({
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  backgroundColor: theme.palette.secondary.main,
}));

export default Circle;
