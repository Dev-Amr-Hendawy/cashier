import { createSlice } from "@reduxjs/toolkit";

//1 >main, 2>plans, 3>devices, 4>payment summary
const initialState = {
  step: 1,
  subscriptionPayment: {
    price: 0,
    tax: 0,
    discount: 0,
    finalPrice: 0,
    package_id: null,
    device_id: null,
    influencer_id: null,
    influencerDiscount: 0,
  },
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionStep: (state, action) => {
      state.step = action.payload;
    },
    setSubscriptionPackage: (state, action) => {
      state.subscriptionPayment.package_id = action.payload;
    },
    setSubscriptionDevice: (state, action) => {
      state.subscriptionPayment.device_id = action.payload;
    },
    setSubscriptionInfluencer: (state, action) => {
      if (
        !action.payload?.id ||
        state.subscriptionPayment.influencer_id == action.payload?.id
      ) {
        return;
      }
      state.subscriptionPayment.influencer_id = action.payload.id;
      state.subscriptionPayment.influencerDiscount = action.payload?.discount;
      if (state.subscriptionPayment.finalPrice && action.payload.discount) {
        state.subscriptionPayment.discount =
          state.subscriptionPayment.discount +
          state.subscriptionPayment.price *
            ((action.payload?.discount || 0) / 100);
        state.subscriptionPayment.finalPrice =
          state.subscriptionPayment.finalPrice *
          ((100 - action.payload?.discount || 0) / 100);
      }
    },
    setSubscriptionPayment: (state, action) => {
      state.subscriptionPayment.price = action.payload.price;
      state.subscriptionPayment.finalPrice = action.payload.finalPrice;
    },
    clearSubscriptionPayment: (state) => {
      // state.currentSubscription = initialState.currentSubscription;
      state.subscriptionPayment = initialState.subscriptionPayment;
    },
  },
});

export const {
  setSubscriptionStep,
  setSubscriptionPackage,
  setSubscriptionDevice,
  setSubscriptionInfluencer,
  setSubscriptionPayment,
  clearSubscriptionPayment,
} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
