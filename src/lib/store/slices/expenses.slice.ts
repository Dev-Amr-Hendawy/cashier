import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  statement: "",
  amount: "",
  date: "",
  note: "",
  created_at: "",
  additional_info: "",
  ExpenseFile: "",
  search_text: "",
  date_from: "",
  date_to: "",
  expense_sort: "",
  expense_filter: "",
  expense_slider: "", //1: day, 2: week, 3: month, 4: year
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (_state, action) => action.payload,
    clearExpense: () => initialState,
    setExpensesSearchText: (state, action) => {
      state.search_text = action.payload;
    },
    setExpensesFilter: (state, action) => {
      state.date_from = action.payload.date_from;
      state.date_to = action.payload.date_to;
    },
    resetExpensesFilter: (state) => {
      state.date_from = initialState.date_from;
      state.date_to = initialState.date_to;
    },
    setExpenseSort: (state, action) => {
      state.expense_sort = action.payload;
    },
    setExpenseSlider: (state, action) => {
      state.expense_slider = action.payload;
    },
  },
});

export const {
  setExpense,
  clearExpense,
  setExpensesSearchText,
  setExpensesFilter,
  resetExpensesFilter,
  setExpenseSort,
  setExpenseSlider,
} = expenseSlice.actions;
export default expenseSlice.reducer;
