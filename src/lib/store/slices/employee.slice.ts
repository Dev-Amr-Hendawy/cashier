import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  phone: "",
  email: "",
  address: "",
  type: null,
  status: null,
  has_permission: null,
  mainBranch: {
    id: null,
    name: "",
    address: "",
    isMain: null,
  },
  filter: {
    search_text: "",
  },
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (_state, action) => action.payload,
    clearEmployee: () => initialState,
    setEmployeeSearchText: (state, action) => {
      state.filter.search_text = action.payload;
    },
  },
});

export const { setEmployee, clearEmployee, setEmployeeSearchText } =
  employeeSlice.actions;
export default employeeSlice.reducer;
