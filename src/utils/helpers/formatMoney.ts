import i18n from "i18next";

export const formatMoney = (amount: string) => {
  if (!amount) return "0";
  const formattedAmount = `${Number(amount).toLocaleString()} ${i18n.t(
    "currency"
  )}`;

  return formattedAmount;
};
