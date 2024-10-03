import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CartSummaryFormContent } from "@components";
import {
  setDiscount,
  setDiscountType,
} from "../../lib/store/slices/cart-slice";
import { RootState } from "../../lib";

interface CartSummaryFormHocProps {
  cartQuantity: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productId: number;
}

export const CartSummaryFormHoc: React.FC<CartSummaryFormHocProps> = ({
  cartQuantity,
  handleChange,
  productId,
}) => {
  const { t } = useTranslation();
  const cartState = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const foundProduct = cartState.products.find(
    (product) => product.id === productId
  );

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const handleOpenDiscountModal = () => {
    setDiscountModalOpen(true);
  };
  const handleCloseDiscountModal = () => {
    setDiscountModalOpen(false);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value)) || Number(e.target.value) <= 0) {
      dispatch(setDiscount({ id: productId, discount: "" }));
    }
    dispatch(
      setDiscount({
        id: productId,
        discount: Number(e.target.value),
      })
    );
  };

  const handleDiscountTypeChange = (v: "1" | "2") => {
    dispatch(
      setDiscountType({
        id: productId,
        discountType: v,
      })
    );
    dispatch(
      setDiscount({
        id: productId,
        discount: 0,
      })
    );
  };

  return (
    <CartSummaryFormContent
      t={t}
      cartQuantity={cartQuantity}
      handleChange={handleChange}
      handleOpenDiscountModal={handleOpenDiscountModal}
      handleCloseDiscountModal={handleCloseDiscountModal}
      discountModalOpen={discountModalOpen}
      handleDiscountChange={handleDiscountChange}
      discountValue={foundProduct?.cartDiscount}
      handleConfirmDiscountModal={handleDiscountTypeChange}
      defaultDiscountType={foundProduct?.cartDiscountType || "2"}
    />
  );
};
