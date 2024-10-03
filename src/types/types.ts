import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { ReactNode } from "react";

// export type AccountInfo = {
//   id: number;
//   taxRecord: null | string;
//   commercialRecord: null | string;
//   commercialRecordName: null | string;
//   tax: string;
//   canReset: boolean;
//   country: Country;
//   email: string;
//   firebase: null | string;
//   has_permission: number;
//   invoicesCount: number;
//   isCompleteAccountInfo: null | string;
//   isCompleteShitInfo: number;
//   lang: string;
//   mainBranch: MainBranch;
//   msgCode: number;
//   name: null | string;
//   note: null | string;
//   paymentStatus: string;
//   phone: string;
//   status: number;
//   subscription: Subscription;
//   token: string;
//   type: number;
// };

// export type MainBranch = {
//   id: number;
//   name: string;
//   address: string;
//   isMain: "1";
//   user_id: number;
// };

export type AuthResponseType = {
  data: IUser | null;
  status: number;
  message: string;
};

export interface SignUpExtension extends AccountInfo {
  msgCode: number;
  token: string;
  status: 1 | 2 | null;
}
export interface SignUpResponse {
  status: number;
  message: string | null;
  data: SignUpExtension;
}

export interface GetPackagesResponseData {
  features: { name: string; name_ar: string; name_en: string; id: number }[];
  country_id: string;
  days: string;
  desc_ar: string;
  desc_en: string;
  discount: number | string | null;
  discountType: number | string | null;
  duration_ar: string;
  duration_en: string;
  finalPrice: string;
  id: number;
  image: string;
  isDiscount: number | string | null;
  name: string;
  name_ar: string;
  name_en: string;
  offlineOrOnline: string;
  price: string;
  usersCount: string;
}

export interface GetDevicesResponseData {
  id: number;
  price: string;
  discount: number | string | null;
  discountType: number | string | null;
  finalPrice: string;
  isDiscount: number | string | null;
  device: {
    id: number;
    name: string;
    image: string;
    status: number;
    model: string;
    description_ar: string;
    description_en: string;
    name_ar: string;
    name_en: string;
    brand: {
      id: number;
      name: string;
      icon: string;
      status: number;
      country_id: string;
      name_ar: string;
      name_en: string;
    };
    deviceFeatures: Array<{
      id: number;
      name_ar: string;
      name_en: string;
    }>;
    devicePaper: Array<{
      id: number;
      name_ar: string;
      name_en: string;
    }>;
    deviceFont: Array<{
      id: number;
      name_ar: string;
      name_en: string;
    }>;
  };
}

export interface GetCountriesResponseData {
  id: number;
  name: string;
  currency: string;
  icon: string;
  status: number;
  countryCode: string;
  phoneNumbers: string;
  name_ar: string;
  name_en: string;
  currency_ar: string;
  currency_en: string;
}
export type SelectBranchType = {
  value: number;
  label: string;
};
export type Product = {
  id: number;
  price: string;
  productPrice: string;
  productPriceAfterDiscount: string;
  discountPrice: string;
  taxPrice: string;
  finalPrice: string;
  name: string;
  inCart: boolean;
  hasDiscount: 0 | 1;
  discount: string;
  discountType: string;
  taxAvailable: number;
  taxType: string;
  desc: string;
  barCode: string;
  quantity: string;
  isQuick: null | number;
  cat: Category;
  cat_id: string;
  parentCat_id: string;
  user_id: string;
  image: string;
  last?: boolean;
  buyPrice: string;
  buyTaxAvailable: number;
  buyTaxType: string;
  buyTaxPrice: string;
  branch: Branch | null;
  branch_id?: string | number | null;
  detected_quantity?: string | number | null;
};

export interface CartProduct extends Product {
  cartQuantity: number;
  cartDiscount?: number;
  // 1=>value , 2=>percentage
  cartDiscountType?: "1" | "2";
}

export type Category = {
  id: number;
  selected: boolean;
  name: string;
  parent_id: number;
  subCategories: Category[];
  last?: boolean;
};

export interface GetPaymentLinkResponse {
  status: number;
  message: string | null;
  data: string;
}

export type FilterItem = {
  name: string;
  icon: ReactNode;
  id: number | string;
  onClick?: () => void;
};

export interface ModalProps {
  title: string;
  open: boolean;
  hasActions: boolean;
  children?: React.ReactNode;
  handleConfirm?: () => void;
  handleClose?: () => void;
  handleCancel?: () => void;
  handleBackBtn?: () => void;
}

export type Client = {
  id?: number;
  user_id?: number;
  name: string;
  phone: string;
  email: string;
  taxRecord: string;
  commercialRecord: string;
  address: string;
  notes: string;
  type: string;
  country?: Country;
  last?: boolean;
  client_id?: number | string;
  payment_status: 1 | 2;
};

export interface AddProductInitialValues {
  name: string;
  description: string;
  product_sort: string;
  product_add_sort: string[];
  price: number;
  image: string | Blob | undefined;
  category: string;
  quantity: number;
  discountType: "1" | "2" | "";
  discount: string;
  taxType: string;
  [key: string]: unknown;
  defaultCategory?: Category | undefined;
  branch?: Branch | null;
}

export type editInitialValuesType = {
  product_id?: string;
  image?: string;
  name: string;
  desc: string;
  barCode: string;
  price: string;
  quantity: string;
  category: string;
  // hasDiscount: "0" | "1" | "";
  hasDiscount: string;
  discountType: string;
  discount: string;
  taxAvailable: string;
  taxType: string;
  parentCat_id: string;
  cat_id: string;
  product_add_sort: string[] | null | string;
  defaultCategory: Category | undefined;
  buyPrice: string;
  buyTaxType: string;
  buyTaxAvailable: string;
  branch?: Branch | null;
  branch_id?: number | string | null;
};
export interface PostBeginShiftResponse {
  status: number;
  message: string | null;
  data: {
    id: number;
    startCash: string;
    startVisa: string;
    endCash: string;
    endVisa: string;
    currentCash: string;
    currentVisa: string;
    endDate: string | null;
    startDate: string;
    mainBranch: string | null;
    statistics: {
      totalPrice: number;
      startDay: string;
      endDate: string | null;
      startTime: string;
      endTime: string | null;
    };
  };
}

export interface clientForm {
  name: string;
  country_id: string;
  email: string;
  phone: string;
  taxRecord: string;
  type: string;
  commercialRecord: string;
  address: string;
  notes: string;
}

export type DrawerLinkItem = {
  link?: string;
  title: string;
  icon: ReactNode;
  handleClick?: () => void;
  value?: string | ReactNode;
  image?: string;
  hasArrow?: boolean;
};

export type PaymentProduct = {
  product_id: string | number;
  quantity: string | number;
  invoiceDiscountValue: string | number | undefined;
  invoiceDiscountType: string | number | undefined;
};

export type InvoiceType = {
  id: number;
  invoiceNumber: number;
  invoiceOrder: number;
  invoiceType: number;
  isPayVisa: number;
  isReturn: number;
  nextData: string;
  date: string;
  paymentStatus: number;
  paymentType: number;
  productPrice: string;
  products: InvoiceProduct[];
  rammingPrice: string;
  runRefund: number | null;
  discount: string;
  discountPrice: string;
  shift: ShiftType | null;
  tax: string;
  taxPrice: string;
  totalPrice: string;
  visaPrice?: string;
  saleOrBuy?: string;
  cashPrice?: string;
  visaType: string | null;
  branch: Branch | null;
  user: IUser | null;
  client: Client | null;
  userDate: IUser | null;
  paid_cashir_price: string;
  change_csahir_price: string;
  zatka: string;
  hasInvoiceNotification?: number;
  parent?: {
    invoiceNumber?: number;
    returnedAmount?: string;
  };
  child_invoice_id?: number | null;
};
export interface IInvoiceNotification {
  id: number;
  cash: string | null;
  visa: string | null;
  invoice_id: number;
  client?: Client | null;
  invoice: InvoiceType;
  products: InvoiceProduct[];
  zatka?: string;
  totalPrice?: string | number;
  price: string | number;
  invoiceNumber: string | number;
  date?: string;
  type: 1 | 2; //1=>Creditor , 2=>debtor
  paymentType: number; //1=>visa , 2=>cash , 3->cash and visa
}
export interface IInvoiceNotificationProduct {
  product: Product;
  product_id: number;
  quantity: number;
  price: number | undefined;
  id: number | string | undefined;
}
export type InvoiceProduct = {
  product: Product;
  discount: string;
  discountType: string;
  discountPrice: string;
  id: number;
  invoiceDiscount: string;
  invoiceDiscountType: string;
  invoiceDiscountValue: string;
  productPrice: string;
  price: string;
  quantity: string;
  taxPrice: string;
  totalPrice: string;
  UnitPrice: string;
  notificationPrice?: number;
  hasNotification?: number;
};

export type ShiftType = {
  branch: null;
  currentCash: string;
  currentVisa: string;
  endCash: string;
  endVisa: string;
  endDate: string | null;
  id: number;
  startCash: string;
  startVisa: string;
};

// export type Branch = {
//   name: string;
//   address: string;
//   isMain: 1 | 2;
//   user_id: number;
//   status: 0 | 1;
// };
export interface CommonModalProps {
  open: boolean;
  handleClose: () => void;
}
export interface Employee {
  id: number;
  name: string;
  phone: string;
  email: string;
  type: number;
  status: number;
  msgCode: number;
  invoicesCount: number;
  paymentStatus: number;
  isCompleteAccountInfo: number;
  isCompleteShitInfo: number;
  has_permission: number;
  lang: null | string;
  firebase: null | string;
  note: null | string;
  token: null | string;
  canReset: boolean;
  country: Country;
  subscription: Subscription;
  accountInfo: null | string;
  mainBranch: MainBranch;
  lastShift: null | string;
}
export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: null | string;
  country: null | string;
  city: null | string;
  additional_info: null | string;
  isMain: number;
  status: number;
  employee: Employee;
}

export interface Expense {
  id: number;
  statement: string;
  amount: string;
  tax: number;
  taxPrice: string;
  totalAmount: string;
  date: string;
  note: string;
  created_at: string;
  additional_info: null;
  ExpenseFile: string;
}

export interface Receipt {
  id: number;
  paymentStatus: number;
  amount: string;
  date: string;
  client: Client | null;
  invoiceData: InvoiceType;
}

export interface ReceiptsData {
  cashPrice: string;
  visaPrice: string;
  receipt_id: string;
  date?: string;
}

export interface Country {
  id: number;
  name: string;
  currency: string;
  icon: string;
  status: number;
  countryCode: string;
  phoneNumbers: number;
  name_ar: string;
  name_en: string;
  currency_ar: string;
  currency_en: string;
}

export interface DeviceBrand {
  id: number;
  name: string;
  icon: string;
  status: number;
  country_id: number;
  name_ar: string;
  name_en: string;
}

export interface DeviceFont {
  id: number;
  name_ar: string;
  name_en: string;
}

export interface DevicePaper {
  id: number;
  name_ar: string;
  name_en: string;
}

export interface Device {
  id: number;
  name: string;
  image: string;
  type: number;
  model: string | null;
  description_ar: string | null;
  description_en: string | null;
  name_ar: string;
  name_en: string;
  brand: DeviceBrand;
  deviceFeatures: string[];
  devicePaper: DevicePaper[];
  deviceFont: DeviceFont[];
}

interface SubscriptionPackage {
  id: number;
  name: string;
  image: string;
  name_ar: string;
  name_en: string;
  duration_ar: string;
  duration_en: string;
  duration: string;
  desc_ar: string | null;
  desc_en: string | null;
  desc: string | null;
  isDiscount: number;
  discount: number;
  discountType: number;
  price: string;
  finalPrice: string;
  days: number;
  usersCount: number;
  offlineOrOnline: number;
  country_id: number;
  features: string[]; // Assuming type is not provided
}

interface SubscriptionDevice {
  id: number;
  isDiscount: number;
  discount: number;
  discountType: number;
  price: string;
  finalPrice: string;
  device: Device;
}

export interface Subscription {
  id: number;
  startDate: string;
  endDate: string;
  daysLeft: number;
  expire: number;
  deviceToken: string;
  packagePrice: string;
  devicePrice: string;
  discountPrice: string;
  taxPrice: string;
  totalPrice: string;
  device: SubscriptionDevice;
  package: SubscriptionPackage;
  influencer: string; // Assuming type is not provided
}

export interface AccountInfo {
  id: number;
  taxRecord: string;
  commercialRecord: string;
  commercialRecordName: string;
  tax: string;
  notification: number;
  drafts: number;
  quickInvoice: number;
  logo: string | null;
  phone: string;
  email: string;
  subscription: Subscription;
  isCompleteShitInfo: 0 | 1;
  isCompleteAccountInfo: 0 | 1;
}

export interface MainBranch {
  id: number;
  name: string;
  address: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  additional_info: string | null;
  isMain: number;
  status: number;
  employee: Employee;
}

export interface IUser {
  id: number;
  name: string | null;
  phone: string;
  email: string;
  type: number;
  status: number;
  msgCode: number;
  invoicesCount: number;
  paymentStatus: number;
  isCompleteAccountInfo: number;
  isCompleteShitInfo: number;
  has_permission: number;
  lang: string;
  firebase: string | null;
  note: string | null;
  token: string;
  canReset: boolean;
  country: Country;
  subscription: Subscription;
  accountInfo: AccountInfo;
  mainBranch: MainBranch;
  lastShift: string | null; // Assuming type is not provided
  created_at?:string | null;
}
export interface IInvoiceSettings {
  id: number;
  productDesc: number;
  client: number;
  cashier: number;
  zatcaQr: number;
  active: number;
  myCashQr: number;
  footerText: string;
}
export interface ISettings {
  id: number;
  name: number;
  commercialRecord: number;
  taxRecord: number;
  tax: number;
  active: number;
  simpleInvoice: IInvoiceSettings;
  taxInvoice: IInvoiceSettings;
  accountInfo: AccountInfo;
}
export interface ISettingsSwitch {
  handleSwitch: (
    value: { [key: string]: string },
    type: "settings" | "values"
  ) => void;
}

export interface IConfirmUserSlice {
  step: "" | "check-type" | "otp";
  confirmValues: { [key: string]: string };
  checkCode: { [key: string]: string };
  updateType: "email" | "phone" | "profile" | "";
  showBoth: false;
}

export interface ICheckCodeInputs {
  title: string;
  description: string;
  id: string;
  textfield: JSX.Element;
}

export interface IAccountInfo {
  id: number;
  name: string | null;
  phone: string;
  email: string;
  type: number;
  status: number;
  accountInfo: {
    logo: string | null;
  };
}

export interface IAccountInfoResponse {
  status: number;
  message: string | null;
  data: IAccountInfo;
}
export interface IBaseApiResponse {
  data: null;
  status: number;
  message: string;
}

export interface SalesReport {
  total_cash: number;
  total_visa: number;
  total_remaining: number;
  total_sales_with_out_tax: number;
  total_sales_with_tax: number;
  start_date?: string | null;
  end_date?: string | null;
}
export interface ProductReport {
  id: number;
  totalSalesProduct: number;
  totalReturnProduct: number;
  totalProduct: number;
  recentlyAdded: number;
  date: string;
}
export interface InventoryReport {
  id: number;
  allQuantity: string;
  quantity: string;
  damageQuantity: string;
  created_at: string;
  product: Product;
}
export interface InventoryReportForm {
  allQuantity: string;
  quantity: string;
  damageQuantity: string;
  finalPrice: string;
  product_id: string;
}
export interface ReportDetails {
  total_price: number;
  total_tax: number;
  total_without_tax: number;
}
export interface ReportsExpenses {
  status: number;
  message: null;
  data: {
    report: {
      total_price: number;
      total_tax: number;
      total_without_tax: number;
    };
    expenses: {
      data: Expense[];
      total_expenses: number;
      text: string;
    };
  };
}
export interface ReportsInvoices {
  status: number;
  message: null;
  data: {
    report: {
      total_price: number;
      total_tax: number;
      total_without_tax: number;
    };
    expenses: {
      data: InvoiceType[];
      text: string;
    };
  };
}

export interface ReportsSales {
  status: number;
  message: null;
  data: {
    start_date: string;
    end_date: string;
    total_sales_with_out_tax: number;
    total_sales_with_tax: number;
    total_cash: number;
    total_visa: number;
    total_remaining: number;
    invoice_count: number;
  }[];
}
export interface ReportsReturnedInvoices {
  status: number;
  message: null;
  data: {
    total_returned_amount: number;
    invoices: {
      data: InvoiceType[];
    };
  };
}
export interface ReportsTaxDeclaration {
  sale_invoices: ReportDetails;
  buy_invoices: ReportDetails;
  expenses: ReportDetails;
  net_total_price: number;
  $tax_total_price: number;
}
export interface ReportResults {
  buyTax: number;
  buyNoTax: number;
  sellTax: number;
  sellNoTax: number;
  total: number;
}
// T>> object of filters
export interface FiltersHandlers<T> {
  filters: T;
  setFilterHandler: (newFilter: { [K in keyof T]?: T[K] }) => void;
  clearFilters: () => void;
  setFiltersHandler: (newFilters: T) => void;
}

// T>> refers to data returned from the api
export interface GetQuery<T> {
  data: InfiniteData<T[], unknown> | undefined;
  error: Error | null;
  isPending: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<T[], unknown>, Error>>;
  ref: (node?: Element | null) => void;
}

export interface NotificationInvoice {
  invoiceNumber: number;
  invoiceId: number;
  date: string;
  client: Client | null;
  products: InvoiceProduct[];
  totalPrice: number;
  tax: number;
  taxPrice: number;
  //payment type recieved frpm BE
  paymentType: number;
  // payment type to send to BE
  paymentTypeSent: number | null;
  type: 1 | 2;
}
