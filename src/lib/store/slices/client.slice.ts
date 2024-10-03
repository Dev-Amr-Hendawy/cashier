import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client_id: null,
  name: "",
  email: "",
  phone: "",
  notes: "",
  address: "",
  totalUnPaid: "",
  taxRecord: "",
  commercialRecord: "",
  user_id: "",
  country: {},
  search_text: "",
  date_from: "",
  date_to: "",
  invoice_paid: "",
  type: "",
  client_sort: "",
  payment_status: "", //1-completed 2-uncompleted
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client_id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.notes = action.payload.notes;
      state.address = action.payload.address;
      state.totalUnPaid = action.payload.totalUnPaid;
      state.taxRecord = action.payload.taxRecord;
      state.commercialRecord = action.payload.commercialRecord;
      state.user_id = action.payload.user_id;
      state.country = action.payload.country;
      state.payment_status = action.payload.payment_status;
    },
    clearClient: () => initialState,
    setClientsSearchText: (state, action) => {
      state.search_text = action.payload;
    },
    setClientsFilter: (state, action) => {
      state.date_from = action.payload.date_from;
      state.date_to = action.payload.date_to;
      state.invoice_paid = action.payload.invoice_paid;
    },

    resetClientsFilter: (state) => {
      state.date_from = initialState.date_from;
      state.date_to = initialState.date_to;
      state.invoice_paid = initialState.invoice_paid;
    },
    setClientType: (state, action) => {
      if (action.payload === 0) {
        state.type = "";
      } else {
        state.type = action.payload;
      }
    },
    setClientSort: (state, action) => {
      state.client_sort = action.payload;
    },
    handleResetClientSlice: (state) => {
      state.client_id = initialState.client_id;
      state.name = initialState.name;
      state.email = initialState.email;
      state.phone = initialState.phone;
      state.notes = initialState.notes;
      state.address = initialState.address;
      state.totalUnPaid = initialState.totalUnPaid;
      state.taxRecord = initialState.taxRecord;
      state.commercialRecord = initialState.commercialRecord;
      state.user_id = initialState.user_id;
      state.country = initialState.country;
      state.search_text = initialState.search_text;
      state.date_from = initialState.date_from;
      state.date_to = initialState.date_to;
      state.invoice_paid = initialState.invoice_paid;
      state.type = initialState.type;
      state.client_sort = initialState.client_sort;
    },
  },
});

export const {
  setClient,
  clearClient,
  setClientsSearchText,
  resetClientsFilter,
  setClientsFilter,
  setClientType,
  setClientSort,
  handleResetClientSlice,
} = clientSlice.actions;
export default clientSlice.reducer;
