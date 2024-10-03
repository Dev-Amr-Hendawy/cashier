import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isExpiringSoon: false,
  isExpiring: false,
  isFree: false,
  haveHeader:true
};

const subscriptionSlice = createSlice({
  name: "subscriptionWarning",
  initialState,
  reducers: {
    setSubscriptionWarning: (state, action) => {
  
      
      const today = new Date();
      const endDate = new Date(action.payload.end); 
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);

      // Subscription is expiring soon (within the next 7 days)
      state.isExpiringSoon = endDate > today && endDate <= sevenDaysFromNow;

      // Subscription is expiring today or already expired
      state.isExpiring = endDate <= today||action.payload.expire===1;

      // Check if the subscription is free
      state.isFree = action.payload.id === 1;
      state.haveHeader = endDate > today && endDate <= sevenDaysFromNow;
    },

    clearSubscriptionState: () => initialState,
  },
});

export const {
  setSubscriptionWarning,
  clearSubscriptionState,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
