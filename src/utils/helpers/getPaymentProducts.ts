import { CartProduct, PaymentProduct } from "@myCash/types/types";

export const getPaymentProducts = (
  products: CartProduct[]
): PaymentProduct[] => {
  const paymentProducts: PaymentProduct[] = [];

  // TODO ento 3aksen om el discount type el 5raaaaaaaaaaaa

  for (let i = 0; i < products.length; i++) {
    const paymentProduct = {
      product_id: products[i].id,
      quantity: products[i].cartQuantity,
      invoiceDiscountValue: products[i].cartDiscount || undefined,
      invoiceDiscountType: products[i].cartDiscountType || undefined,
    };
    if (!products[i]?.cartDiscount) {
      delete paymentProduct?.invoiceDiscountValue;
    }

    paymentProducts.push(paymentProduct);
  }

  return paymentProducts;
};
