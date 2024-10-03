import {   IInvoiceNotification } from "@myCash/types";
import { createSlice } from "@reduxjs/toolkit";
export interface IInvoicesSendNotificationProductState {
  product_id: number;
  quantity: number;
  price: number;
}
export interface IInvoicesSendNotificationState {
  invoice: IInvoiceNotification | null;
  invoice_id: string;
  type: number | null;
  products:IInvoicesSendNotificationProductState []| null;
}

const initialState: IInvoicesSendNotificationState = {
  invoice: null,
  invoice_id: "",

  products: null,
  type: null,
};

const invoiceSendNotificationSlice = createSlice({
  name: "invoiceSendNotification",
  initialState,
  reducers: {
    setInvoiceSendNotification: (state, action) => {
      state.invoice = action.payload.invoice;
      state.invoice_id = action.payload.invoice_id;
      state.products = action.payload.products;
      state.type = action.payload.type;
    },

    handleResetInvoiceSendNotificationSlice: (state) => {
      state.invoice = null;
      state.invoice_id = "";
      state.products = null;
      state.type = null;
    },
  },
});

export const {
  setInvoiceSendNotification,
  handleResetInvoiceSendNotificationSlice,
} = invoiceSendNotificationSlice.actions;
export default invoiceSendNotificationSlice.reducer;
