import { Stack } from "@mui/material";
import React from "react";
import {
  CartBuyInvoiceModal,
  CartContainer,
  CartHeader,
  CategorySecondarySlider,
  CategorySection,
  HomeLayout,
  HomeProducts,
  HomeProductsHeader,
} from "../../common";
import { StyledMainContainer } from "./styles";

interface HomeContentProps {}

export const HomeContent: React.FC<HomeContentProps> = () => {
  return (
    <HomeLayout
      leftSide={
        <Stack>
          <HomeProductsHeader />
          <CategorySection />
          <StyledMainContainer>
            <CategorySecondarySlider />
            <HomeProducts />
          </StyledMainContainer>
        </Stack>
      }
      rightSide={
        <Stack>
          <CartHeader />
          <CartContainer />
          <CartBuyInvoiceModal />
        </Stack>
      }
    />
  );
};
