import {
  AccountHelpPage,
  AccountInfoPage,
  AccountSecurityPage,
  BranchesPage,
  ClientsInvoicesPage,
  ClientsPage,
  ClientsRecieptsPage,
  // ExpensesPage,
  InvoiceDetailsPage,
  InvoiceReturn,
  InvoiceSettingsPage,
  InvoicesNotificationsPage,
  NotificationsPage,
  PayRecieptPage,
  PaymentDetails,
  PaymentPage,
  QuickInvoicePage,
  ReportsPage,
  ReportsProductsPage,
  ReportsInventoryPage,
  ReportsSalesPage,
  SalesInvoicesPage,
  SettingsDevicePage,
  SettingsPage,
  SettingsPrintPage,
  SubscriptionsPage,
  SystemInfoPage,
  // UsersPage,
  // ReportsExpensesPage,
  ReportsInvoicesSellPage,
  ReportsInvoicesBuyPage,
  ReportsTaxDeclarationPage,
  InvoiceNotificationSendPage,
  SuccessPage,
  InvoicesNotificationDetailsPage,
  PaymentNotificationPage,
  SystemInfoSignUpPage,
  ReportsInvoicesSellSpecialTimePage,
  ReportsInvoicesReturnedPage,
} from "@myCash/pages";
import { Route } from "react-router-dom";

import HomePage from "../pages/Home.page";
import { RouterLayout } from "../common";
import { ProtectedRoutes } from "./protcedRoutes.routes";
// import { TestPage } from "../pages/TestPage";
import { lazy } from "react";
import ErrorBoundaryRoutes from "./errorBoundary.routes";
import { ProtectedByInfo } from "./protectedByInfo.routes";
// import { ProtectedByPayment } from "./protectedByPayment.routes";
import { TestPage } from "@myCash/pages/TestPage";
import PrivacyPage from "@myCash/pages/Privacy.page";

// import { ProtectedRoutes } from "./protcedRoutes.routes";

export const LoginPage = lazy(() => import("../pages/Login"));
export const SignUpPage = lazy(() =>
  import("../pages/Signup").then((module) => ({ default: module.SignUpPage }))
);
export const ForgetPasswordPage = lazy(() => import("../pages/ForgetPassword"));

export default function AppRouter() {
  return (
    <ErrorBoundaryRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/complete-system-info" element={<SystemInfoSignUpPage />} />
        <Route element={<ProtectedByInfo />}>
          <Route path="/supscription-payment" element={<SubscriptionsPage />} />
          {/* <Route element={<ProtectedByPayment />}> */}
            <Route element={<RouterLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-notification" element={<PaymentNotificationPage />} />
              <Route
                path="/payment-details/:invoiceId"
                element={<PaymentDetails />}
              />
              <Route path="/sales-invoices" element={<SalesInvoicesPage />} />
              {/* clients */}
              <Route path="/clients" element={<ClientsPage />} />
              <Route
                path="/clients/:client_id/invoices"
                element={<ClientsInvoicesPage />}
              />
              <Route
                path="/clients/:id/reciepts"
                element={<ClientsRecieptsPage />}
              />
              <Route
                path="/invoices/pay/:invoice_id"
                element={<ClientsRecieptsPage />}
              />
              <Route
                path="/clients/:client_id/invoices/:invoiceId"
                element={<InvoiceDetailsPage />}
              />

              {/* Invoices */}
              <Route
                path="/invoices/invoice-details/:invoiceId"
                element={<InvoiceDetailsPage />}

              /> 
            
              <Route
                path="/invoices/return-invoice/:invoiceId"
                element={<InvoiceReturn />}
              />
              <Route
                path="/invoices/reciepts/pay-reciept/:recieptId"
                element={<PayRecieptPage />}
              />

              {/* // hide ability to add users and branches for now but we will used   */}
              {/* Clients */}
              {/* <Route path="/users" element={<UsersPage />} /> */}

              {/* Branches */}
              <Route path="/branches" element={<BranchesPage />} />

              {/* Expenses */}
              {/* <Route path="/expenses" element={<ExpensesPage />} /> */}

              {/* Notifications */}
              <Route path="/notifications" element={<NotificationsPage />} />

              {/* Subscriptions */}
              <Route path="/subscriptions" element={<SubscriptionsPage />} />

              {/* invoices */}
              <Route path="/invoices" element={<ClientsInvoicesPage />} />
   {/* invoices selected */}
              <Route path="/invoices/:invoiceId" element={<ClientsInvoicesPage />} />
              {/* Settings */}
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/settings/invoice"
                element={<InvoiceSettingsPage />}
              />
              <Route path="/settings/print" element={<SettingsPrintPage />} />
              <Route path="/settings/device" element={<SettingsDevicePage />} />

              {/* Reports */}
              <Route path="/reports" element={<ReportsPage />} />
              <Route
                path="/reports/sales-reports"
                element={<ReportsSalesPage />}
              />
              <Route
                path="/reports/products-reports"
                element={<ReportsProductsPage />}
              />
              <Route
                path="/reports/inventory-reports"
                element={<ReportsInventoryPage />}
              />
              <Route
                path="/reports/returned-reports"
                element={<ReportsInvoicesReturnedPage />}
              />
              <Route
                path="/reports/invoices/sell-reports"
                element={<ReportsInvoicesSellPage />}
              /><Route
              path="/reports/invoices/sell-reports/:dateFrom/:dateTo/:branchId"
              element={<ReportsInvoicesSellSpecialTimePage />}
            />
              <Route
                path="/reports/invoices/buy-reports"
                element={<ReportsInvoicesBuyPage />}
              />
              <Route
                path="/reports/tax-declaration"
                element={<ReportsTaxDeclarationPage />}
              />
              {/* Account */}
              <Route
                path="/account-security"
                element={<AccountSecurityPage />}
              />
              <Route path="/account-help" element={<AccountHelpPage />} />
              <Route path="/system-info" element={<SystemInfoPage />} />
              <Route path="/account-info" element={<AccountInfoPage />} />
              {/* invoices notifications */}

              <Route
                path="/invoices-notifications"
                element={<InvoicesNotificationsPage />}
              />
              <Route
                path="/send-invoice-notifications/:invoiceId"
                element={<InvoiceNotificationSendPage />}
              />
              <Route
                path="/invoice-notification-details/:invoiceId"
                element={<InvoicesNotificationDetailsPage />}
              />
              <Route path="/success" element={<SuccessPage />} />
              {/* Quick invoice */}
              <Route path="/quick-invoice" element={<QuickInvoicePage />} />
              {/* TODO:: remove in production */}
              {/* <Route path="/test" element={<TestPage />} /> */}
            </Route>
            {/* 404 */}
            <Route path="*" element={<div>404</div>} />
            {/* TODO:: remove on production */}
            {/* Test */}
            <Route path="/test" element={<TestPage />} />
          {/* </Route> */}
        </Route>
      </Route>
    </ErrorBoundaryRoutes>
  );
}
