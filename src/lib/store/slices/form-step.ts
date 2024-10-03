import { createSlice } from "@reduxjs/toolkit";

// TODO:: add comments for step
const initialState = {
  step: 1,
};

const formStepSlice = createSlice({
  name: "formStep",
  initialState,
  reducers: {
    changeStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { changeStep } = formStepSlice.actions;
export default formStepSlice.reducer;
