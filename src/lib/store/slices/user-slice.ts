import { IUser, MainBranch } from "../../../types/types";

import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 1 | 2 | null;
  mainBranch: MainBranch | null;
  beginShift: {
    cash: null | number;
    visa: null | number;
  };
  freeTrial: boolean;
};

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: null, //1- user confirmed code 2-user not confirmed or blocked
  beginShift: { cash: null, visa: null },
  mainBranch: null,
  freeTrial: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.mainBranch = action.payload.user.mainBranch;
      state.status = action.payload.user.status;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.beginShift = { cash: null, visa: null };
      state.status = null;
    },
    register: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.status = action.payload.user.status;
    },
    firstLoginHandler: (state, action) => {
      state.beginShift = {
        cash: action.payload.cash,
        visa: action.payload.visa,
      };
    },
    setFreeTrail: (state, action) => {
      state.freeTrial = action.payload;
    },
    updateUserData: (state, action) => {
      state.user = action.payload;
      state.mainBranch = action.payload?.mainBranch;
    },
  },
});

export const {
  login,
  logout,
  register,
  firstLoginHandler,
  setFreeTrail,
  updateUserData,
} = userSlice.actions;
export default userSlice.reducer;
