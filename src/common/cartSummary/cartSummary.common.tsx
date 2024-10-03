import { CartSummaryItem } from "../cartSummaryItem";
import { RootState } from "../../lib";
import { StyledContainer } from "./styles";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const CartSummary = () => {
  const { t } = useTranslation();
  const cartState = useSelector((state: RootState) => state.cart);
  return (
    <StyledContainer>
      <CartSummaryItem
        title={t("invoice.summary.titleOne")}
        quantity={cartState?.total?.toLocaleString()}
      />
      <CartSummaryItem
        title={t("invoice.summary.titleTwo", {
          tax: cartState?.taxPercentage * 100,
        })}
        quantity={cartState?.totalAfterTax?.toLocaleString()}
      />
      <CartSummaryItem
        title={t("invoice.summary.titleThree")}
        quantity={cartState?.totalDiscount?.toLocaleString()}
      />
    </StyledContainer>
  );
};
