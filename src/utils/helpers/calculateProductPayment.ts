import { CartProduct } from "@myCash/types/types";

export const calculateProductPayment = (product: CartProduct) => {
  // const productPrice = Number(product.productPriceAfterDiscount);
  const productPrice = Number(product.productPrice);

  // totalPrice after cart discount
  const totalProductPriceAfterDiscount = product.cartQuantity * productPrice;
  // total price without discount
  const totalProductPrice = product.cartQuantity * productPrice;
  // calculate discount amount
  const discountAmount =
    product.cartDiscountType === "1"
      ? product.cartDiscount
      : product.cartDiscount;
  let discountValue;
  discountValue =
    product.cartDiscountType === "1"
      ? product.cartDiscount
      : (product.cartDiscount || 0 * totalProductPrice) / 100;
  if (Number(product.discountPrice) > 0 && discountValue) {
    discountValue = Number(product.discountPrice) + discountValue;
  }

  // product price after cart discount

  let productsPriceAfterDiscount = totalProductPrice;
  if (discountValue) {
    productsPriceAfterDiscount = totalProductPrice - discountValue;
  }
  // discount marker
  const discountMarker = product.cartDiscountType === "1" ? "ر.س" : "%";
  return {
    totalProductPriceAfterDiscount,
    totalProductPrice,
    discountAmount,
    discountMarker,
    productsPriceAfterDiscount,
  };
};
