import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  report: { total_price: null, total_tax: null, total_without_tax: null },
  totalExpenses: null,
  expensesCount: null,
};

const reportsExpenses = createSlice({
  name: "reportsExpenses",
  initialState,
  reducers: {
    setReportsExpensesData: (state, action) => {
      state.report = action.payload.report;
      state.totalExpenses = action.payload.totalExpenses;
      state.expensesCount = action.payload.expensesCount;
    },
    clearReport: () => initialState,
  },
});

export const { setReportsExpensesData } = reportsExpenses.actions;
export default reportsExpenses.reducer;
