import {InvoiceProduct} from "@myCash/types/types";

// this fn to calculate cart for buy invoice type

export const calculateProductPaymentNotification = (products: InvoiceProduct[]) => {
  let totalPrice = 0;
  let totalTax = 0;
  let finalTotal = 0;
  const totalDiscount = 0;
  const total = products.reduce((acc, product) => {
    if(product.hasNotification) return acc ;
    if (product.product.buyTaxAvailable === 1) {
      totalTax = totalTax + Number(product.quantity) * Number(product?.product.buyTaxPrice);
    }
    return acc + Number(product.quantity) * Number(product?.product?.price);
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
