import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import branchReducer from "./slices/branch.slice";
import cartReducer from "./slices/cart-slice";
import categoryReducer from "./slices/category-slice";
import clientReducer from "./slices/client.slice";
import confirmUserReducer from "./slices/confrimUser.slice";
import employeeReducer from "./slices/employee.slice";
import expensesReducer from "./slices/expenses.slice";
import formStepReducer from "./slices/form-step";
import invoicesNotificationsReducer from "./slices/invoicesNotifications.slice";
import invoiceSendNotificationReducer from "./slices/invoicesSendNotification.slice";
import subscriptionWarningReducer from "./slices/subscriptionWarning.slice";
import invoicesReducer from "./slices/invoices.slice";
import layoutReducer from "./slices/layoutSlice";
import paymentReducer from "./slices/payment-slice";
import productsReducer from "./slices/products-slice";
import quickInvoiceReducer from "./slices/quickInvoice.slice";
import receiptReducer from "./slices/receipt.slice";
import returnInvoiceReducer from "./slices/returnInvoice.slice";
import singleItemReducer from "./slices/singleItem.slice";
import storage from "redux-persist/lib/storage";
import subscriptionReducer from "./slices/subscriptionApi.slice";
import userReducer from "./slices/user-slice";
import reportsReducer from "./slices/reports.slice";
import reportsExpensesReducer from "./slices/reportsExpenses.slice";
import reportsInvoicesReducer from "./slices/reportsInvoices.slice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["layout", "cart","invoiceSendNotification","formStep"],
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: [
    "user",
    "token",
    "isAuthenticated",
    "mainBranch",
    "settings",
    "freeTrial",
    // "status",
  ],
};

const rootReducer = combineReducers({
  invoicesNotifications: invoicesNotificationsReducer,
  invoiceSendNotification: invoiceSendNotificationReducer,
  layout: layoutReducer,
  formStep: formStepReducer,
  cart: cartReducer,
  products: productsReducer,
  category: categoryReducer,
  payment: paymentReducer,
  user: persistReducer(userPersistConfig, userReducer),
  singleItem: singleItemReducer,
  client: clientReducer,
  employee: employeeReducer,
  branch: branchReducer,
  expense: expensesReducer,
  subscription: subscriptionReducer,
  subscriptionWarning: subscriptionWarningReducer,
  receipt: receiptReducer,
  invoices: invoicesReducer,
  confirmUser: confirmUserReducer,
  returnInvoice: returnInvoiceReducer,
  quickInvoice: quickInvoiceReducer,
  // endShift: endShiftReducer,
  reports: reportsReducer,
  reportsExpenses: reportsExpensesReducer,
  reportsInvoices: reportsInvoicesReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
