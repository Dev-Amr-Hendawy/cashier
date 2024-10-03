import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  phone: "",
  email: "",
  address: "",
  type: null,
  status: 0,
  has_permission: null,
  isMain: 0,
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

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranch: (_state, action) => action.payload,
    clearBranch: () => initialState,
    setBranchSearchText: (state, action) => {
      state.filter.search_text = action.payload;
    },
  },
});

export const { setBranch, clearBranch, setBranchSearchText } =
  branchSlice.actions;
export default branchSlice.reducer;
