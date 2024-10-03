import { Product } from "@myCash/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productReport: {
    id: NaN,
    totalSalesProduct: NaN,
    totalReturnProduct: NaN,
    totalProduct: NaN,
    recentlyAdded: NaN,
    date: "",
  },
  inventoryReport: {
    id: NaN,
    allQuantity: "",
    quantity: "",
    damageQuantity: "",
    created_at: "",
    product: {} as Product | Record<string, never>,
    finalPrice: "",
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setProductReport: (state, action) => {
      state.productReport = action.payload;
    },
    setInventoryReport: (state, action) => {
      state.inventoryReport = action.payload;
    },
    clearReport: () => initialState,
  },
});

export const { setProductReport, setInventoryReport, clearReport } =
  reportSlice.actions;
export default reportSlice.reducer;
