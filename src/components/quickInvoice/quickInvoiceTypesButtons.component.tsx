import {
  CardRemove,
  CardSlash,
  CardTick,
  MoneyTime,
  WalletMoney,
} from "iconsax-react";
import {
  RootState,
  resetQuickInvoice,
  setQuickInvoicePaymentType,
} from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { HeaderWithBack } from "@myCash/common/headerWithBack";
import { PaymentType } from "@myCash/common";
import { QuickInvoiceCreditModal } from "./quickInvoiceCreditModal.component";
import { Stack } from "@mui/system";
import applePay from "../../assets/images/apple-pay.svg";
import madapay from "../../assets/images/mada-pay.svg";
import mastercard from "../../assets/images/mastercard.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import visa from "../../assets/images/visa-logo.svg";

// import { useState } from "react";

// import { PaymentCreditModal } from ".";

interface PaymentTypesButtonsProps {}

const paymentButtons = [
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

export const QuickInvoiceTypesButtons: React.FC<
  PaymentTypesButtonsProps
> = () => {
  const { t } = useTranslation();
  const [creditModalOpen, setCreditModalOpen] = useState<boolean>(false);
  const quickInvoiceState = useSelector(
    (state: RootState) => state.quickInvoice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Stack gap={"0.5rem"}>
      <HeaderWithBack
        title={t("payment.title")}
        handleClose={() => {
          navigate("/");
          dispatch(resetQuickInvoice());
        }}
      />
      {/* padding={"0.5rem 0.5rem 0 2rem"} */}
      <Stack direction={"row"} gap={"1rem"} padding=".5rem .5rem 0 0">
        {paymentButtons.map((button) => (
          <PaymentType
            key={button.type}
            active={quickInvoiceState.paymentType === button.type}
            title={t(button.title)}
            icon={button.icon && button.icon}
            iconImages={button.iconImages && button.iconImages}
            PaymentType={button.type}
            handleClick={() => {
              // dispatch(resetQuickInvoice());
              dispatch(setQuickInvoicePaymentType(button.type));
              // dispatch(resetPayments());
              if (button.type === 3 || button.type === 5) {
                setCreditModalOpen(true);
              }
            }}
          />
        ))}
      </Stack>
      <QuickInvoiceCreditModal
        open={creditModalOpen}
        handleClose={() => setCreditModalOpen(false)}
      />
    </Stack>
  );
};
