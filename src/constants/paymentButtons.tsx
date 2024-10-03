import {
  CardRemove,
  CardSlash,
  CardTick,
  MoneyTime,
  WalletMoney,
} from "iconsax-react";
import visa from "../assets/images/visa-logo.svg";
import mastercard from "../assets/images/mastercard.svg";
import madapay from "../assets/images/mada-pay.svg";
import applePay from "../assets/images/apple-pay.svg";

export const paymentButtons = [
  {
    type: 2,
    iconImages: [mastercard, visa, applePay, madapay],
    title: "payment.visa",
  },
  { type: 1, icon: <WalletMoney size="32" />, title: "payment.cash" },
  { type: 3, icon: <MoneyTime size="32" />, title: "payment.credit" },
  { type: 4, icon: <CardTick size="32" />, title: "payment.cash-visa" },
  { type: 5, icon: <CardRemove size="32" />, title: "payment.cash-credit" },
  { type: 6, icon: <CardSlash size="32" />, title: "payment.installment" },
];
