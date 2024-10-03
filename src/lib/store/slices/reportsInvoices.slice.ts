import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellReport: {
    total_price: null,
    total_tax: null,
    total_without_tax: null,
    invoicesCount: null,
  },
  buyReport: {
    total_price: null,
    total_tax: null,
    total_without_tax: null,
    invoicesCount: null,
  },
};

const reportsInvoices = createSlice({
  name: "reportsInvoices",
  initialState,
  reducers: {
    setReportsInvoicesSell: (state, action) => {
      state.sellReport = action.payload.report;
    },
    setReportsInvoicesBuy: (state, action) => {
      state.buyReport = action.payload.report;
    },
    clearReport: () => initialState,
  },
});

export const { setReportsInvoicesSell, setReportsInvoicesBuy } =
  reportsInvoices.actions;
export default reportsInvoices.reducer;
