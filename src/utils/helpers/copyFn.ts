import { CartProduct } from "@myCash/types/types";

// this fn to calculate cart for buy invoice type

export const calculateTotalBuyCartPrice = (
  products: CartProduct[]
  //   taxPercentage: number
) => {
  let totalPrice = 0;
  let totalTax = 0;
  //   let totalDiscount = 0;
  let finalTotal = 0;
  const total = products.reduce((acc, product) => {
    // let productTotalDiscount = Number(product.discountPrice || 0);

    if (
      product?.cartDiscount &&
      product?.cartDiscountType === "2" &&
      product?.cartDiscount <= 100
    ) {
      //   productTotalDiscount =
      //     (product.cartDiscount * Number(product.productPrice)) / 100 +
      //     productTotalDiscount;
      // totalDiscount =
      //   totalDiscount +
      //   (product.cartQuantity *
      //     Number(product.productPrice) *
      //     product.cartDiscount) /
      //     100 +
      //   product.cartQuantity * Number(product.discountPrice || 0);
    } else if (
      product?.cartDiscount &&
      product?.cartDiscountType === "2" &&
      product?.cartDiscount > 100
    ) {
      //   product.cartDiscount = 0;
      //   productTotalDiscount = 0 + productTotalDiscount;
    }
    if (
      product?.cartDiscount &&
      product?.cartDiscountType === "1" &&
      product?.cartDiscount <=
        Number(product.productPriceAfterDiscount) * product.cartQuantity
    ) {
      // totalDiscount =
      //   totalDiscount +
      //   product.cartDiscount +
      //   product.cartQuantity * Number(product.discountPrice || 0);
      //   productTotalDiscount = product.cartDiscount + productTotalDiscount;
    } else if (
      product?.cartDiscount &&
      product?.cartDiscountType === "1" &&
      product?.cartDiscount > Number(product.productPriceAfterDiscount)
    ) {
      //   product.cartDiscount = 0;
      // productTotalDiscount = 0 + productTotalDiscount;
    }

    // totalDiscount = totalDiscount + product.cartQuantity * productTotalDiscount;
    // productTotalDiscount = 0 + productTotalDiscount;
    if (product.buyTaxAvailable === 1) {
      totalTax =
        totalTax +
        product.cartQuantity *
          //   (Number(product.productPrice) - productTotalDiscount) *
          Number(product?.buyTaxPrice);
    }

    return acc + product.cartQuantity * Number(product?.buyPrice);
  }, 0);
  totalPrice = total;
  // const totalPriceAfterDiscount = total - totalDiscount;

  // totalTax = totalPriceAfterDiscount * taxPercentage;
  finalTotal = total + totalTax;

  return {
    totalPrice,
    totalTax,
    // totalDiscount,
    finalTotal,
  };
};
