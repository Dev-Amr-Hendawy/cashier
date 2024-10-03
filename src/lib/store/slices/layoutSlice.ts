import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productColumns: 4,
  clientsGrid: false,
  colorMode: "light",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeProductsColumns: (state) => {
      state.productColumns = state.productColumns === 4 ? 5 : 4;
    },
    changeClientsGrid: (state) => {
      state.clientsGrid = !state.clientsGrid;
    },
    toggleColorMode: (state) => {
      state.colorMode = state.colorMode === "light" ? "dark" : "light";
    },
  },
});

export const { changeProductsColumns, changeClientsGrid, toggleColorMode } =
  layoutSlice.actions;
export default layoutSlice.reducer;
