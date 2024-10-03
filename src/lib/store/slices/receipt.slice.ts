import { Receipt } from "@myCash/types";
import { createSlice } from "@reduxjs/toolkit";

export interface ReceiptState {
  receipt: Receipt | null;
  receipt_id: string;
  filters: {
    search_text: string;
    date_from: string;
    date_to: string;
    paymentStatus: string;
    sort: string;
  };
  openFilterModal: boolean;
}

const initialState: ReceiptState = {
  receipt: null,
  receipt_id: "",
  filters: {
    search_text: "",
    date_from: "",
    date_to: "",
    paymentStatus: "",
    sort: "",
  },
  openFilterModal: false,
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    setReceiptId: (state, action) => {
      state.receipt_id = action.payload;
    },
    setReceipt: (state, action) => {
      state.receipt = action.payload;
    },
    setReceiptSort: (state, action) => {
      state.filters.sort = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.filters.paymentStatus = action.payload;
    },
    setReceiptsSearchText: (state, action) => {
      state.filters.search_text = action.payload;
    },
    openReceiptFilterModal: (state) => {
      state.openFilterModal = true;
    },
    closeReceiptFilterModal: (state) => {
      state.openFilterModal = false;
    },
    setReceiptsDateFrom: (state, action) => {
      state.filters.date_from = action.payload;
    },
    setReceiptsDateTo: (state, action) => {
      state.filters.date_to = action.payload;
    },
    resetReceiptsFilters: (state) => {
      state.filters = {
        search_text: state.filters.search_text,
        date_from: "",
        date_to: "",
        paymentStatus: "",
        sort: "",
      };
    },
    handleSubmitReceiptsFilters: (state, action) => {
      state.filters = {
        search_text: state.filters.search_text || "",
        sort: state.filters.sort || "",
        date_from: action.payload.date_from,
        date_to: action.payload.date_to,
        paymentStatus: action.payload.paymentStatus,
      };
    },
    handleResetReceiptsSlice: (state) => {
      state.receipt = null;
      state.receipt_id = "";
      state.filters = {
        search_text: "",
        date_from: "",
        date_to: "",
        paymentStatus: "",
        sort: "",
      };
    },
  },
});

export const {
  setReceipt,
  setReceiptSort,
  setPaymentStatus,
  setReceiptsSearchText,
  setReceiptsDateFrom,
  setReceiptsDateTo,
  resetReceiptsFilters,
  openReceiptFilterModal,
  closeReceiptFilterModal,
  handleSubmitReceiptsFilters,
  handleResetReceiptsSlice,
  setReceiptId,
} = receiptSlice.actions;
export default receiptSlice.reducer;
