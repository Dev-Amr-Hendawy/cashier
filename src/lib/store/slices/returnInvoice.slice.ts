import { InvoiceProduct, InvoiceType } from "@myCash/types";

import { createSlice } from "@reduxjs/toolkit";

interface IInvoiceState {
  invoice: InvoiceType | null;
  products: InvoiceProduct[];
}

const initialState: IInvoiceState = {
  invoice: null,
  products: [],
};

const returnInvoiceSlice = createSlice({
  name: "returnInvoice",
  initialState,
  reducers: {
    setReturnInvoice: (state, action) => {
      state.invoice = action.payload;
      state.products = action.payload.products;
    },
    decreaseProductQuantity: (state, action) => {
      if (state?.invoice?.products) {
        const product = state.invoice.products.find(
          (product) => product.id === action.payload
        );

        if (product?.quantity === "0") return;
        if (product) {
          product.quantity = String(Number(product.quantity) - 1);
        }
      }
    },
    deleteProductFromInvoice: (state, action) => {
      if (state?.invoice?.products) {
        const product = state.invoice.products.find(
          (product) => product.id === action.payload
        );
        if (product) {
          product.quantity = String(0);
        }
      }
    },
    increaseProductQuantity: (state, action) => {
      if (state?.invoice?.products) {
        const product = state.invoice.products.find(
          (product) => product.id === action.payload
        );
        const mainProduct = state.products.find(
          (product) => product.id === action.payload
        );
        if (Number(product?.quantity) >= Number(mainProduct?.quantity)) return;
        if (product) {
          product.quantity = String(Number(product.quantity) + 1);
        }
      }
    },
  },
});

export const {
  setReturnInvoice,
  decreaseProductQuantity,
  increaseProductQuantity,
  deleteProductFromInvoice,
} = returnInvoiceSlice.actions;
export default returnInvoiceSlice.reducer;
