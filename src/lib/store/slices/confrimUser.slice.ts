import { IConfirmUserSlice } from "@myCash/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IConfirmUserSlice = {
  step: "",
  confirmValues: {},
  checkCode: {},
  updateType: "",
  showBoth: false,
};

const confirmUserSlice = createSlice({
  name: "confirmUser",
  initialState,
  reducers: {
    setConfirmStep: (state, action) => {
      state.step = action.payload;
    },
    setMainData: (state, action) => {
      state.confirmValues = action.payload;
    },
    setCheckCodeData: (state, action) => {
      state.checkCode = action.payload;
    },
    setUpdateType: (state, action) => {
      state.updateType = action.payload;
    },
    setShowBoth: (state, action) => {
      state.showBoth = action.payload;
    },
  },
});

export const {
  setConfirmStep,
  setMainData,
  setCheckCodeData,
  setUpdateType,
  setShowBoth,
} = confirmUserSlice.actions;
export default confirmUserSlice.reducer;
