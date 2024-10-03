import { useSelector } from "react-redux";
import { CartInvoiceSection } from "..";
import cartLogo from "../../assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { CartTotal } from "../cardTotal";
import { CartActions } from "../cartActions";
import { CartItems } from "../cartItems";
import { CartSummary } from "../cartSummary";
import { CartLogo, StyledRightSideContainer } from "./styles";
import { RootState } from "../../lib";
import { useColorMode } from "@myCash/hooks";

export const CartContainer = () => {
  const cartState = useSelector((state: RootState) => state.cart);
  const { isLightMode } = useColorMode();
  return (
    <StyledRightSideContainer>
      {cartState.products.length === 0 ? (
        <CartLogo src={isLightMode ? cartLogo : cartLogoDark} alt="cart-logo" />
      ) : (
        <>
          <CartItems products={cartState.products} />
          <CartSummary />
          <CartTotal
            total={cartState?.finalTotal?.toLocaleString() || "0.00"}
          />
          <CartInvoiceSection />
          <CartActions />
        </>
      )}
    </StyledRightSideContainer>
  );
};
