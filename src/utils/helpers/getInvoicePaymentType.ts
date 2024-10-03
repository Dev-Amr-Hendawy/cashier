import i18n from "i18next";

export const getInvoicePaymentType = (paymentType: number) => {
  switch (paymentType) {
    case 1:
      return i18n.t("payment.cash");
    case 2:
      return i18n.t("payment.visa");
    case 3:
      return i18n.t("payment.credit");
    case 4:
      return i18n.t("payment.cash-visa");
    case 5:
      return i18n.t("payment.cash-credit");
    case 6:
      return i18n.t("payment.installment");
    default:
      return i18n.t("payment.cash");
  }
};
