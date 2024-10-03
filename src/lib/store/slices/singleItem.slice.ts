import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
};

const itemSlice = createSlice({
  name: "singleItem",
  initialState,
  reducers: {
    setItemId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setItemId } = itemSlice.actions;
export default itemSlice.reducer;
