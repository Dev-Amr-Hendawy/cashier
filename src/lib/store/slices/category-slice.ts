import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../../types/types";

type categoriesState = {
  categories: Category[];
  singleCategoryName: string | undefined;
  singleCategoryId: number | undefined;
};

const initialState: categoriesState = {
  categories: [],
  singleCategoryName: undefined,
  singleCategoryId: undefined,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSingleCategory: (state, action) => {
      state.singleCategoryId = action.payload?.id;
      state.singleCategoryName = action.payload.name;
    },
    removeSingleCategory: (state) => {
      state.singleCategoryId = undefined;
      state.singleCategoryName = undefined;
    },
  },
});

export const { setCategories, setSingleCategory } = categorySlice.actions;
export default categorySlice.reducer;
