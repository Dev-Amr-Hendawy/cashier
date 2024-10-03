import {
  // ArrowSwapVertical,
  Bag,
  Box,
  Headphone,
  HomeTrendUp,
  Layer,
  Medal,
  MoneyRecive,
  // MoneySend,
  More2,
  Note,
  Notification,
  People,
  // PercentageCircle,
  // Profile2User,
  Receipt2,
  ReceiptItem,
  SecurityUser,
  Setting2,
  ShieldSecurity,
  Shop,
} from "iconsax-react";

import { DrawerLinkItem } from "@myCash/types/types";
import { Typography } from "@mui/material";
import { t } from "i18next";

export const firstLinks: DrawerLinkItem[] = [
  {
    link: "/",
    title: "products",
    icon: <Note variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/invoices",
    title: "invoices",
    icon: <ReceiptItem variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/invoices-notifications",
    title: "invoiceNotifications.title",
    icon: <Receipt2 variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/clients",
    title: "clients",
    icon: <People variant="TwoTone" color="var(--grey-900)" />,
  },
  // {
  //   link: "/expenses",
  //   title: "expenses.title",
  //   icon: <ArrowSwapVertical variant="TwoTone" color="var(--grey-900)" />,
  // },
];
// hide expenses and ability to add users and branches for now but we will used
export const secondLinks: DrawerLinkItem[] = [
  {
    title: "notifications.title",
    // link: "/notifications",
    icon: <Notification variant="TwoTone" color="var(--grey-900)" />,
    value: (
      <Typography variant="body1" color={"secondary"}>
        {t("soon")}
      </Typography>
    ),
  },
  // {
  //   link: "/users",
  //   title: "users.title",
  //   icon: <Profile2User variant="TwoTone" color="var(--grey-900)" />,
  // },
  {
    link: "/branches",
    title: "branches.title",
    icon: <Shop variant="TwoTone" color="var(--grey-900)" />,
  },
];
export const thirdLinks: DrawerLinkItem[] = [
  {
    link: "/account-info",
    title: "accountInfo.title",
    icon: <SecurityUser variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/account-security",
    title: "accountSecurity.title",
    icon: <ShieldSecurity variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/system-info",
    title: "systemInfo.title",
    icon: <More2 variant="TwoTone" color="var(--grey-900)" />,
  },
];
export const fourthLinks: DrawerLinkItem[] = [
  {
    link: "/account-help",
    title: "accountSecurity.help",
    icon: <Headphone variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/settings",
    title: "settings.title",
    icon: <Setting2 variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/subscriptions",
    title: "subscriptions.renewLink",
    icon: <Medal variant="TwoTone" color="var(--grey-900)" />,
  },
];
//  hidden 	Buy Invoices Report and  Tax declaration report for now but will used
export const reportsSubLinks: DrawerLinkItem[] = [
  {
    link: "/reports",
    title: "reports.mainReports",
    icon: <HomeTrendUp variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/reports/sales-reports",
    title: "reports.salesReports",
    icon: <Box variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/reports/invoices/sell-reports",
    title: "reports.sellReports",
    icon: <MoneyRecive variant="TwoTone" color="var(--grey-900)" />,
  },  {
    link: "/reports/returned-reports",
    title: "reports.returnedReports",
    icon: <MoneyRecive variant="TwoTone" color="var(--grey-900)" />,
  },
  // {
  //   link: "/reports/invoices/buy-reports",
  //   title: "reports.buyReports",
  //   icon: <MoneySend variant="TwoTone" color="var(--grey-900)" />,
  // },
  {
    link: "/reports/products-reports",
    title: "reports.productsReports",
    icon: <Bag variant="TwoTone" color="var(--grey-900)" />,
  },
  {
    link: "/reports/inventory-reports",
    title: "reports.inventoryReports",
    icon: <Layer variant="TwoTone" color="var(--grey-900)" />,
  },
  // {
  //   link: "/reports/tax-declaration",
  //   title: "reports.taxReports",
  //   icon: <PercentageCircle variant="TwoTone" color="var(--grey-900)" />,
  // },
  // {
  //   link: "/reports/expenses-reports",
  //   title: "reports.expensesReports",
  //   icon: <MoneySend variant="TwoTone" color="var(--grey-900)" />,
  // },
];
