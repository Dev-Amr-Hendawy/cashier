import { CartProduct } from "@myCash/types/types";

// this fn to calculate cart for buy invoice type

export const calculateTotalBuyCartPrice = (products: CartProduct[]) => {
  let totalPrice = 0;
  let totalTax = 0;
  let finalTotal = 0;
  const totalDiscount = 0;
  const total = products.reduce((acc, product) => {
    if (product.buyTaxAvailable === 1) {
      totalTax = totalTax + product.cartQuantity * Number(product?.buyTaxPrice);
    }
    return acc + product.cartQuantity * Number(product?.buyPrice);
  }, 0);
  totalPrice = total;
  finalTotal = total + totalTax;
  return {
    totalPrice,
    totalTax,
    finalTotal,
    totalDiscount, // totaldiscount is returned with 0 for dynamicallity in cart state//TODO:: consider changing this
  };
};
