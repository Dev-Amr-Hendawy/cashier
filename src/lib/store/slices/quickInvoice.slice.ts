import { CartProduct, Client } from "../../../types/types";

import { createSlice } from "@reduxjs/toolkit";

export type quickInvoiceState = {
  products: [] | CartProduct[];
  invoice: 1 | 2 | 3;
  total: number;
  totalTax: number;
  totalDiscount: number;
  finalTotal: number;
  invoice_client: Client | null;
  taxPercentage: number;
  paymentType: 1 | 2 | 3 | 4 | 5 | 6;
  date: string;
  productModal: boolean;
  totalCash: number;
  totalVisa: number;
  totalPaid: number;
  totalRemaining: number;
};

const initialState: quickInvoiceState = {
  products: [],
  invoice: 1,
  total: 0, // total price before tax and discounts
  totalTax: 0, // total tax amount on all products
  totalDiscount: 0, // total discount amount applied
  finalTotal: 0, // total after adding tax and deducting discounts
  invoice_client: null,
  taxPercentage: 0.15,
  paymentType: 2,
  date: "",
  productModal: false,
  totalCash: 0,
  totalVisa: 0,
  totalPaid: 0,
  totalRemaining: 0,
};

const calculateTotalCartPrice = (
  products: CartProduct[],
  taxPercentage: number
) => {
  let totalPrice = 0;
  let totalTax = 0;
  products.forEach((product) => {
    totalPrice += Number(product.price) * Number(product.quantity);
    if (String(product.taxAvailable) === "1") {
      totalTax +=
        Number(product.price) * Number(product.quantity) * taxPercentage;
    }
  });
  const finalTotal = totalPrice + totalTax;
  return { totalPrice, totalTax, finalTotal };
};

const quickInvoiceSlice = createSlice({
  name: "quickInvoice",
  initialState,
  reducers: {
    addProductQuickInvoice: (state, action) => {
      // const { totalPrice, totalTax, totalDiscount, finalTotal } = calculateTotalCartPrice(
      //   [...state.products, action.payload],
      //   state.taxPercentage
      // );
      state.products = [...state.products, action.payload];
      // state.total = Number(action.payload.price) * Number(action.payload.quantity);
      // if (action.payload.taxAvailable === "1") {
      //   state.totalAfterTax = state.totalAfterTax + action.payload.price * action.payload.quantity * 0.15;
      // }
      // // state.totalDiscount = totalDiscount;
      // state.finalTotal = state.total + Number(state.totalAfterTax);
      const { totalPrice, totalTax, finalTotal } = calculateTotalCartPrice(
        state.products,
        state.taxPercentage
      );
      state.total = totalPrice;
      state.totalTax = totalTax;
      state.finalTotal = finalTotal;
    },

    deleteProductQuickInvoice: (state, action) => {
      state.products = state.products.filter(
        (_product, index) => index !== action.payload
      );
      const { totalPrice, totalTax, finalTotal } = calculateTotalCartPrice(
        state.products,
        state.taxPercentage
      );
      state.total = totalPrice;
      state.totalTax = totalTax;
      state.finalTotal = finalTotal;
    },

    clearQuickInvoice: (state) => {
      state.products = [];
      state.invoice = 1;
      state.total = 0;
      state.totalTax = 0;
      state.totalDiscount = 0;
      state.finalTotal = 0;
      state.invoice_client = null;
    },
    addQuickInvoicePayment: (state, action) => {
      if (state.paymentType === 1) {
        state.totalCash = action.payload;
        state.totalPaid = state.totalCash;
      } else if (state.paymentType === 2) {
        state.totalVisa = action.payload;
        state.totalPaid = state.totalVisa;
      } else if (state.paymentType === 3) {
        state.totalCash = action.payload;
        state.totalPaid = state.totalCash;
        state.totalRemaining = state.finalTotal - state.totalPaid;
      } else if (state.paymentType === 4) {
        state.totalCash = action.payload.firstInput;
        state.totalVisa = action.payload.secondInput;
        state.totalPaid = state.totalCash + state.totalVisa;
      } else if (state.paymentType === 5) {
        state.totalVisa = action.payload;
        state.totalPaid = state.totalVisa;
        state.totalRemaining = state.finalTotal - state.totalPaid;
      }
    },
    // setInvoice: (state, action) => {
    //   state.invoice = action.payload;
    // },
    // setDiscountQuickInvoice: (state, action) => {
    //   state.products = state.products.map((product: CartProduct) => {
    //     if (product.id === action.payload.id) {
    //       return { ...product, quickInvoiceDiscount: action.payload.discount };
    //     }
    //     return product;
    //   });
    //   const { totalPrice, totalTax, totalDiscount, finalTotal } = calculateTotalCartPrice(
    //     state.products,
    //     state.taxPercentage
    //   );
    //   state.total = totalPrice;
    //   state.totalAfterTax = totalTax;
    //   state.totalDiscount = totalDiscount;
    //   state.finalTotal = finalTotal;
    // },
    // setDiscountTypeQuickInvoice: (state, action) => {
    //   state.products = state.products.map((product: CartProduct) => {
    //     if (product.id === action.payload.id) {
    //       return {
    //         ...product,
    //         quickInvoiceDiscountType: action.payload.discountType,
    //       };
    //     }
    //     return product;
    //   });
    //   const { totalPrice, totalTax, totalDiscount, finalTotal } = calculateTotalCartPrice(
    //     state.products,
    //     state.taxPercentage
    //   );
    //   state.total = totalPrice;
    //   state.totalAfterTax = totalTax;
    //   state.totalDiscount = totalDiscount;
    //   state.finalTotal = finalTotal;
    // },
    setClientQuickInvoice: (state, action) => {
      state.invoice_client = action.payload;
    },
    setQuickInvoicePaymentType: (state, action) => {
      state.totalCash = 0;
      state.totalVisa = 0;
      state.totalPaid = 0;
      state.totalRemaining = 0;
      state.date = "";
      state.paymentType = action.payload;
    },
    resetQuickInvoice: () => {
      return initialState;
      // state.products = [];
      // state.invoice = 1;
      // state.total = 0;
      // state.totalTax = 0;
      // state.totalDiscount = 0;
      // state.finalTotal = 0;
      // state.invoice_client = null;
      // state.taxPercentage = 0;
      // state.paymentType = 2;
    },
    setQuickInvoiceDate: (state, action) => {
      state.date = action.payload;
    },
    setProductModal: (state, action) => {
      state.productModal = action.payload;
    },
  },
});

export const {
  clearQuickInvoice,
  //   setInvoice,
  // setDiscountQuickInvoice,
  // setDiscountTypeQuickInvoice,
  setClientQuickInvoice,
  addProductQuickInvoice,
  addQuickInvoicePayment,
  deleteProductQuickInvoice,
  setQuickInvoicePaymentType,
  resetQuickInvoice,
  setQuickInvoiceDate,
  setProductModal,
} = quickInvoiceSlice.actions;
export default quickInvoiceSlice.reducer;
