import i18n from "i18next";

export const getInvoiceTypeTitle = (invoiceType: number) => {
  switch (invoiceType) {
    case 1:
      return i18n.t("invoice.simpleInvoice");
    case 2:
      return i18n.t("invoice.taxInvoice");
    case 3:
      return i18n.t("invoice.salesInvoice");
    default:
      return i18n.t("invoice.simpleInvoice");
  }
};
