import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  paymentType: number;
  totalCash: number;
  totalVisa: number;
  totalPaid: number;
  totalRemaining: number;
  totalCredit: number;
  remainingCreditCash: number;
  remainingCreditVisa: number;
  paymentDate: string;
  finalPaymentTotal: number;
}
// payment types as follow:
// 1: Cash
// 2: visa
// 3: credit
// 4: cash/visa
// 5: credit/visa
// 6: installment

const initialState: initialStateTypes = {
  paymentType: 1,
  totalCash: 0,
  totalVisa: 0,
  totalPaid: 0,
  totalRemaining: 0,
  totalCredit: 0,
  remainingCreditCash: 0,
  remainingCreditVisa: 0,
  paymentDate: "",
  finalPaymentTotal: 0,
};
const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    setPaymentType: (state, action) => {
      state.paymentType = action.payload;
    },
    addPayment: (state, action) => {
      if (state.paymentType === 1) {
        state.totalCash = action.payload;
        state.totalPaid = state.totalCash;
      } else if (state.paymentType === 2) {
        state.totalVisa = action.payload;
        // state.totalPaid = state.totalVisa;
        state.totalPaid = action.payload;
      } else if (state.paymentType === 3) {
        state.totalCash = action.payload;
        state.totalPaid = state.totalCash;
        state.totalRemaining = state.finalPaymentTotal - state.totalPaid;
      } else if (state.paymentType === 4) {
        state.totalCash = action.payload.firstInput;
        state.totalVisa = action.payload.secondInput;
        state.totalPaid = state.totalCash + state.totalVisa;
      } else if (state.paymentType === 5) {
        state.totalVisa = action.payload;
        state.totalPaid = state.totalVisa;
        state.totalRemaining = state.finalPaymentTotal - state.totalPaid;
      }
    },
    setPaymentDate: (state, action) => {
      state.paymentDate = action.payload;
    },
    resetPayments: (state) => {
      state.totalCash = 0;
      state.totalPaid = 0;
      state.totalRemaining = 0;
      state.totalVisa = 0;
      state.totalCredit = 0;
      state.remainingCreditCash = 0;
      state.remainingCreditVisa = 0;
    },
    resetDate: (state) => {
      state.paymentDate = "";
    },
    setFinalPaymentTotal: (state, action) => {
      state.finalPaymentTotal = action.payload;
    },
  },
});
export default paymentSlice.reducer;
export const {
  setFinalPaymentTotal,
  setPaymentType,
  addPayment,
  setPaymentDate,
  resetPayments,
  resetDate,
} = paymentSlice.actions;
