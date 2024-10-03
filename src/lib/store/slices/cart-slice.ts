import { CartProduct, Client } from "../../../types/types";

import {
  calculateTotalBuyCartPrice,
  calculateTotalCartPrice,
} from "@myCash/utils";
import { createSlice } from "@reduxjs/toolkit";

export type CartState = {
  products: [] | CartProduct[];
  invoiceTaxType: 1 | 2; //1-simple 2- tax
  invoiceType: 1 | 2; //1- sell 2- buy
  total: number;
  totalAfterTax: number;
  totalDiscount: number;
  finalTotal: number;
  invoice_client: Client | null;
  taxPercentage: number;
  sellInvoiceData: {
    referenceNumber: string;
    referenceDate: string;
    note?: string;
  };
};

const initialState: CartState = {
  products: [],
  invoiceTaxType: 1,
  invoiceType: 1, //invoice type >> 1- sell 2- buy
  total: 0, // total price before tax and discounts
  totalAfterTax: 0, // total tax amount on all products
  totalDiscount: 0, // total discount amount applied
  finalTotal: 0, // total after adding tax and deducting discounts
  invoice_client: null,
  taxPercentage: 0,
  sellInvoiceData: {
    referenceNumber: "",
    referenceDate: "",
    note: "",
  },
};

// const globalState=store.getState().

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTaxPercentage: (state, action) => {
      state.taxPercentage = action.payload;
    },
    addProduct: (state, action) => {
      // check for invoice type if sell or buy
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        state.invoiceType === 2
          ? calculateTotalBuyCartPrice([...state.products, action.payload])
          : calculateTotalCartPrice(
              [...state.products, action.payload],
              state.taxPercentage
            );

      state.products = [...state.products, action.payload];
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    addManyProductsAi: (state, action) => {
      // Helper function to find if a product exists in the cart
      const productExists = (product: CartProduct, products: CartProduct[]) =>
        products.some((p) => p.id === product.id);
    
      // Filter new products that are not already in the cart
      const newProducts = action.payload.filter(
        (product: CartProduct) => !productExists(product, state.products)
      );
    
      // Calculate totals based on the invoice type
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        state.invoiceType === 2
          ? calculateTotalBuyCartPrice([...state.products, ...newProducts])
          : calculateTotalCartPrice([...state.products, ...newProducts], state.taxPercentage);
    
      // Update the state
      state.products = [...state.products, ...newProducts];
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    increaseQuantity: (state, action) => {
      state.products = state.products.map((product: CartProduct) => {
        if (product.id === action.payload) {
          return { ...product, cartQuantity: product.cartQuantity + 1 };
        }
        return product;
      });
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        state.invoiceType === 2
          ? calculateTotalBuyCartPrice([...state.products])
          : calculateTotalCartPrice([...state.products], state.taxPercentage);
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    decreaseQuantity: (state, action) => {
      state.products = state.products.map((product: CartProduct) => {
        if (product.id === action.payload) {
          return { ...product, cartQuantity: product.cartQuantity - 1 };
        }
        return product;
      });
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        state.invoiceType === 2
          ? calculateTotalBuyCartPrice([...state.products])
          : calculateTotalCartPrice([...state.products], state.taxPercentage);
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    setQuantity: (state, action) => {
      state.products = state.products.map((product: CartProduct) => {
        if (product.id === action.payload.id) {
          return { ...product, cartQuantity: action.payload.quantity };
        }
        return product;
      });
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        state.invoiceType === 2
          ? calculateTotalBuyCartPrice([...state.products])
          : calculateTotalCartPrice([...state.products], state.taxPercentage);
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        state.invoiceType === 2
          ? calculateTotalBuyCartPrice([...state.products])
          : calculateTotalCartPrice([...state.products], state.taxPercentage);
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    clearCart: (state) => {
      state.products = [];
      state.invoiceTaxType = 1;
      state.invoiceType = 1;
      state.total = 0;
      state.totalAfterTax = 0;
      state.totalDiscount = 0;
      state.finalTotal = 0;
      state.invoice_client = null;
    },
    setInvoiceTaxType: (state, action) => {
      state.invoiceTaxType = action.payload;
    },
    setInvoiceType: (state, action) => {
      state.invoiceType = action.payload;
      // open sell invoice modal and clear sell invoice data
      if (action.payload === 2) {
        state.sellInvoiceData = initialState.sellInvoiceData;
      }
      if (action.payload === 1) {
        state.products = state.products.map((product) =>
          product.cartQuantity > Number(product.quantity)
            ? { ...product, cartQuantity: Number(product.quantity) }
            : product
        );
      }
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        state.invoiceType === 2
          ? calculateTotalBuyCartPrice([...state.products])
          : calculateTotalCartPrice([...state.products], state.taxPercentage);
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    setSellInvoiceData: (state, action) => {
      state.sellInvoiceData = action.payload;
    },
    clearSellInvoiceData: (state) => {
      state.sellInvoiceData = initialState.sellInvoiceData;
    },
    setDiscount: (state, action) => {
      state.products = state.products.map((product: CartProduct) => {
        if (product.id === action.payload.id) {
          return { ...product, cartDiscount: action.payload.discount };
        }
        return product;
      });
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        calculateTotalCartPrice(state.products, state.taxPercentage);
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    setDiscountType: (state, action) => {
      state.products = state.products.map((product: CartProduct) => {
        if (product.id === action.payload.id) {
          return { ...product, cartDiscountType: action.payload.discountType };
        }
        return product;
      });
      const { totalPrice, totalTax, totalDiscount, finalTotal } =
        calculateTotalCartPrice(state.products, state.taxPercentage);
      state.total = totalPrice;
      state.totalAfterTax = totalTax;
      state.totalDiscount = totalDiscount;
      state.finalTotal = finalTotal;
    },
    setClientInvoice: (state, action) => {
      state.invoice_client = action.payload;
    },
  },
});

export const {
  addProduct,addManyProductsAi,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  deleteProduct,
  clearCart,
  setInvoiceTaxType,
  setDiscount,
  setDiscountType,
  setClientInvoice,
  setTaxPercentage,
  setInvoiceType,
  setSellInvoiceData,
  clearSellInvoiceData,
} = cartSlice.actions;
export default cartSlice.reducer;
