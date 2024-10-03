import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CartProduct } from "../../types/types";
import { CartSingleItem } from "../cartSingleItem";
import { StyledHeaderContainer } from "./styles";

type CartItemsProps = {
  products: CartProduct[];
};

export const CartItems = ({ products }: CartItemsProps) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <StyledHeaderContainer>
        <Typography variant="h6" color="grey.400">
          {t("product")}
        </Typography>
        <Typography variant="h6" color="grey.400">
          {t("quantity")}
        </Typography>
        <Typography variant="h6" color="grey.400">
          {t("price")}
        </Typography>
      </StyledHeaderContainer>
      {/* <CartItems /> */}
      <Stack>
        {products.map((product, index) => (
          <CartSingleItem key={index} {...product} />
        ))}
      </Stack>
    </Stack>
  );
};
