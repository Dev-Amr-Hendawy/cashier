import { InvoiceProduct } from "@myCash/types";

export const calculateInvoiceNotification = (
  products: InvoiceProduct[],
  tax: number
) => {
  const { totalPrice, taxPrice } = products.reduce(
    (acc, product) => {
      if(product.hasNotification) return acc;
      if (product.notificationPrice && Number(product.notificationPrice) !== 0) {
        const productPrice = Number(product.notificationPrice) * Number(product.quantity) ;
        if (product.product.taxAvailable === 1) {
          const productTax = productPrice * (tax / 100);
          acc.taxPrice += productTax;
          acc.totalPrice += productPrice + productTax;
        } else {
          acc.totalPrice += productPrice;
        }
      }
      return acc;
    },
    { totalPrice: 0, taxPrice: 0 }
  );
  return { totalPrice, taxPrice };
};
