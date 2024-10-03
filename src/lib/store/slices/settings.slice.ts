import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // id: null,
  // name: 0,
  // commercialRecord: 0,
  // taxRecord: 0,
  // tax: 0,
  // active: 0,
  // simpleInvoice: {
  //   productDesc: 0,
  //   client: 0,
  //   cashier: 0,
  //   zatcaQr: 0,
  //   active: 0,
  //   myCashQr: 0,
  //   footerText: "",
  // },
  // taxInvoice: {
  //   productDesc: 0,
  //   client: 0,
  //   cashier: 0,
  //   zatcaQr: 0,
  //   active: 0,
  //   myCashQr: 0,
  //   footerText: "",
  // },
  // accountInfo: {
  //   taxRecord: "",
  //   commercialRecord: "",
  //   commercialRecordName: "",
  //   tax: "12",
  //   notification: 0,
  //   drafts: 0,
  //   quickInvoice: 0,
  // },
  invoiceType: 1, //1 simple invoice, 2 tax invoice
  // pending: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettings: () => initialState,
    setInvoiceType: (state, action) => {
      state.invoiceType = action.payload;
    },
  },
});

export const { clearSettings, setInvoiceType } = settingsSlice.actions;
export default settingsSlice.reducer;
