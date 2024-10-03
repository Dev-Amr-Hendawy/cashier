import { InvoiceType } from "@myCash/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IInvoiceState {
  invoice: InvoiceType | null;
  invoice_id: string;
  filters: {
    search_text: string;
    sort: string;
    date_from: string;
    date_to: string;
    paymentStatus: string;
    isReturn?: 0 | 1 | null; //0=>normal 1=>Returned
    type?: 1 | 2 | null; //1-normal 2-quick
    invoiceType?: 1 | 2 | 3 | null; //1=>simple , 2=>tax , 3=>buy
  };
}

const initialState: IInvoiceState = {
  invoice: null,
  invoice_id: "",
  filters: {
    search_text: "",
    sort: "",
    date_from: "",
    date_to: "",
    paymentStatus: "",
    isReturn: null,
    type: null,
    invoiceType: null,
  },
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoiceId: (state, action) => {
      state.invoice_id = action.payload;
    },
    setInvoicesSort: (state, action) => {
      state.filters.sort = action.payload;
    },
    setInvoicesSearchText: (state, action) => {
      state.filters.search_text = action.payload;
    },

    setInvoicesDateFrom: (state, action) => {
      state.filters.date_from = action.payload;
    },
    setInvoicesDateTo: (state, action) => {
      state.filters.date_to = action.payload;
    },
    setInvoicesPaymentStatus: (state, action) => {
      state.filters.paymentStatus = action.payload;
    },
    setInvoicesType: (state, action) => {
      state.filters.type = action.payload?.type || null;
      state.filters.invoiceType = action.payload?.invoiceType || null;
      state.filters.isReturn = action.payload?.isReturn || null;
    },
    clearInvoicesType: (state) => {
      state.filters.type = null;
      state.filters.invoiceType = null;
      state.filters.isReturn = null;
    },
    handleSubmitInvoicesFilters: (state, action) => {
      state.filters = {
        search_text: state.filters.search_text || "",
        sort: state.filters.sort || "",
        date_from: action.payload.date_from,
        date_to: action.payload.date_to,
        paymentStatus: action.payload.paymentStatus,
      };
    },
    resetInvoicesFilters: (state) => {
      state.filters = {
        search_text: "",
        sort: "",
        date_from: "",
        date_to: "",
        paymentStatus: "",
      };
    },
    handleResetInvoicesSlice: (state) => {
      state.invoice = null;
      state.invoice_id = "";
      state.filters = {
        search_text: "",
        sort: "",
        date_from: "",
        date_to: "",
        paymentStatus: "",
      };
    },
  },
});

export const {
  setInvoiceId,
  setInvoicesSort,
  setInvoicesSearchText,
  setInvoicesDateFrom,
  setInvoicesDateTo,
  handleSubmitInvoicesFilters,
  resetInvoicesFilters,
  handleResetInvoicesSlice,
  setInvoicesPaymentStatus,
  setInvoicesType,
  clearInvoicesType,
} = invoicesSlice.actions;
export default invoicesSlice.reducer;
