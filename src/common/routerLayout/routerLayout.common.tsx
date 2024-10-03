import { Header } from "../header";
import { Outlet } from "react-router-dom";
import { StyledStack } from "./styles";
import { Box } from "@mui/material";

export const RouterLayout = () => {
  // useGetCategories();

  return (
    <StyledStack>
      <Header />
      <Box component={"div"} position="relative" >
      <Outlet />
      </Box>
    </StyledStack>
  );
};
