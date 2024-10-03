import { InvoiceType } from "@myCash/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IInvoicesNotificationsState {
  invoice: InvoiceType | null;
  invoice_id: string;
  filters: {
    search_text: string;
    sort: string;
    date_from: string;
    date_to: string;
    type: string;
  };
}

const initialState: IInvoicesNotificationsState = {
  invoice: null,
  invoice_id: "",
  filters: {
    search_text: "",
    sort: "",
    date_from: "",
    date_to: "",
    type: "",
  },
};

const invoicesNotificationsSlice = createSlice({
  name: "invoicesNotifications",
  initialState,
  reducers: {
    setInvoiceNotificationId: (state, action) => {
      state.invoice_id = action.payload;
    },
    setInvoicesNotificationsSort: (state, action) => {
      state.filters.sort = action.payload;
    },
    setInvoicesNotificationsSearchText: (state, action) => {
      state.filters.search_text = action.payload;
    },

    setInvoicesNotificationsDateFrom: (state, action) => {
      state.filters.date_from = action.payload;
    },
    setInvoicesNotificationsDateTo: (state, action) => {
      state.filters.date_to = action.payload;
    },
    setInvoicesNotificationsType: (state, action) => {
      state.filters.type = action.payload;
    },
    handleSubmitInvoicesNotificationsFilters: (state, action) => {
      state.filters = {
        search_text: state.filters.search_text || "",
        sort: state.filters.sort || "",
        date_from: action.payload.date_from,
        date_to: action.payload.date_to,
        type: action.payload.type,
      };
    },
    resetInvoicesNotificationsFilters: (state) => {
      state.filters = {
        search_text: "",
        sort: "",
        date_from: "",
        date_to: "",
        type: "",
      };
    },
    handleResetInvoicesNotificationsSlice: (state) => {
      state.invoice = null;
      state.invoice_id = "";
      state.filters = {
        search_text: "",
        sort: "",
        date_from: "",
        date_to: "",
        type: "",
      };
    },
  },
});

export const {
  setInvoiceNotificationId,
  setInvoicesNotificationsSort,
  setInvoicesNotificationsSearchText,
  setInvoicesNotificationsDateFrom,
  setInvoicesNotificationsDateTo,
  setInvoicesNotificationsType,
  handleSubmitInvoicesNotificationsFilters,
  resetInvoicesNotificationsFilters,
  handleResetInvoicesNotificationsSlice,
} = invoicesNotificationsSlice.actions;
export default invoicesNotificationsSlice.reducer;
