import { createSlice } from "@reduxjs/toolkit";

// TODO:: refac with backend
//1 >main, 2>plans, 3>devices, 4>payment summary
const initialState = {
  step: 1,
  isNewPlan: false,
  package: {
    id: null,
    price: "",
    finalPrice: "",
    discount: "",
  },
  device: {
    id: null,
    price: "",
    finalPrice: "",
    discount: null,
  },
  currentSubscription: {
    totalPrice: "",
    discountPrice: "",
    taxPrice: "",
    devicePrice: "",
    packagePrice: "",
    package: {
      id: null,
      price: "",
      finalPrice: "",
      discount: "",
    },
    device: {
      id: null,
      price: "",
      finalPrice: "",
      discount: null,
    },
  },
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
    setCurrentSubscription: (state, action) => {
      state.currentSubscription = action.payload;
    },
    setCurrentSubscriptionPlan: (state, action) => {
      state.currentSubscription.package = action.payload;
      state.currentSubscription.packagePrice = action.payload.finalPrice;
    },
    setSubscriptionPlan: (state, action) => {
      state.package = action.payload;
    },
    setSubscriptionDevice: (state, action) => {
      state.device = action.payload;
    },
    setSubscriptionPayment: (state, action) => {
      state.subscriptionPayment = action.payload;
    },
    setReduxDevice: (state, action) => {
      // TODO:: reface fn and optimize
      state.device = action.payload;
      if (state.currentSubscription.package.id != state.package.id) {
        state.subscriptionPayment.device_id =
          state.currentSubscription.device?.id != action.payload?.id
            ? action.payload?.id
            : state.currentSubscription.device?.id;
        state.subscriptionPayment.price =
          (state.currentSubscription.device?.id != action.payload?.id
            ? Number(action.payload.price)
            : 0) + Number(state.package.finalPrice);
        state.subscriptionPayment.tax = 0;
        state.subscriptionPayment.discount = 0;
        // state.currentSubscription.device.id != state.device.id
        //   ? Number(state.device.discount)
        //   : 0 + Number(state.package.discount);
        state.subscriptionPayment.finalPrice =
          (state.currentSubscription.device.id != state.device.id
            ? Number(state.device.finalPrice)
            : 0) + Number(state.package.finalPrice);
        state.subscriptionPayment.package_id =
          // state.currentSubscription.package.id != state.package.id &&
          state.package.id !== null
            ? state?.package?.id
            : state?.currentSubscription?.package.id;
      } else {
        state.subscriptionPayment.device_id =
          state.currentSubscription.device?.id != action.payload?.id
            ? action.payload?.id
            : state.currentSubscription.device?.id;
        state.subscriptionPayment.price =
          (state.currentSubscription.device.id != state.device.id
            ? Number(state.device.finalPrice)
            : 0) + Number(state.currentSubscription.packagePrice) || 0;
        state.subscriptionPayment.finalPrice =
          (state.currentSubscription.device.id != state.device.id
            ? Number(state.device.finalPrice)
            : 0) + Number(state.currentSubscription.packagePrice) || 0;
        state.subscriptionPayment.package_id =
          state.currentSubscription.package.id;
      }
    },
    setIsNewPlan: (state, action) => {
      state.isNewPlan = action.payload;
    },
    setInfluencer: (state, action) => {
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
        // state.subscriptionPayment.discount =
        //   state.subscriptionPayment.discount +
        //   state.subscriptionPayment.price *
        //     ((action.payload?.discount || 0) / 100);
      }
    },
    clearSubscriptionData: (state) => {
      // state.currentSubscription = initialState.currentSubscription;
      state.package = initialState.package;
      state.device = initialState.device;
      state.subscriptionPayment = initialState.subscriptionPayment;
      state.isNewPlan = initialState.isNewPlan;
    },
    clearSubscriptionPayment: (state) => {
      state.subscriptionPayment = initialState.subscriptionPayment;
    },
    clearSubscriptionState: () => initialState,
  },
});

export const {
  setSubscriptionStep,
  setCurrentSubscription,
  setSubscriptionPlan,
  setSubscriptionDevice,
  // setSubscriptionPayment,
  setReduxDevice,
  setIsNewPlan,
  clearSubscriptionPayment,
  setInfluencer,
  clearSubscriptionState,
  // clearSubscriptionData,
  setCurrentSubscriptionPlan,
} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
