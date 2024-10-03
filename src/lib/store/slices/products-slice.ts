import { createSlice } from "@reduxjs/toolkit";

type State = {
  filter: {
    parent_cat_id: number | null;
    categories:
      | {
          id: number;
          name: string;
        }[]
      | null;
    sort: number | null;
    discountType: number | null;
    date_from: Date |string| undefined;
    date_to: Date |string| undefined;
    search_text: string;
  };
  expandCategories: boolean;
  productsForm: {
    open: boolean;
  };
};

const initialState: State = {
  filter: {
    parent_cat_id: null,
    categories: null,
    sort: null,
    date_from: undefined,
    date_to: undefined,
    discountType: null,
    search_text: "",
  },
  expandCategories: false,
  productsForm: {
    open: false,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.filter.sort = action.payload;
    },
    setDiscountTypeSort: (state, action) => {
      state.filter.discountType = action.payload;
    },
    setDateFrom: (state, action) => {
      state.filter.date_from = action.payload;
    },
    setDateTo: (state, action) => {
      state.filter.date_to = action.payload;
    },
    setsSearchText: (state, action) => {
      state.filter.search_text = action.payload;
    },
    clearSorting: (state) => {
      state.filter.sort = null;
      state.filter.discountType = null;
      state.filter.date_from = undefined;
      state.filter.date_to = undefined;
      state.filter.search_text = "";
    },
    clearCat: (state) => {
      state.filter.parent_cat_id = null;
      state.filter.categories = null;
    },
    setExpandCategories: (state, action) => {
      state.expandCategories = action.payload;
    },
    addCat: (state, action) => {
      if (state.filter.categories) {
        state.filter.categories = [...state.filter.categories, action.payload];
      } else {
        state.filter.categories = [action.payload];
      }
    },
    removeLastCat: (state) => {
      if (state.filter.categories && state?.filter?.categories?.length > 1) {
        state.filter.categories = state.filter.categories.slice(0, -1);
      } else {
        state.filter.categories = null;
      }
    },
    openProductsForm: (state) => {
      state.productsForm.open = true;
    },

    closeProductsForm: (state) => {
      state.productsForm.open = false;
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
