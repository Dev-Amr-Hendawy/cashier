import { Stack } from "@mui/system";
import { PaymentType } from "@myCash/common";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CardTick, WalletMoney } from "iconsax-react";
import { HeaderWithBack } from "@myCash/common/headerWithBack";

import visa from "../../assets/images/visa-logo.svg";
import madapay from "../../assets/images/mada-pay.svg";
import applePay from "../../assets/images/apple-pay.svg";
import mastercard from "../../assets/images/mastercard.svg";

interface NotificationPaymentTypesProps {
  paymentType: number;
  handlePaymentType: (type: number) => void;
}

const paymentButtons = [
  {
    type: 2,
    iconImages: [mastercard, visa, applePay, madapay],
    title: "payment.visa",
  },
  { type: 1, icon: <WalletMoney size="32" />, title: "payment.cash" },
  // { type: 3, icon: <MoneyTime size="32" />, title: "payment.credit" },
  { type: 3, icon: <CardTick size="32" />, title: "payment.cash-visa" },
  // { type: 5, icon: <CardRemove size="32" />, title: "payment.cash-credit" },
  // { type: 6, icon: <CardSlash size="32" />, title: "payment.installment" },
];

export const NotificationPaymentTypes: React.FC<
  NotificationPaymentTypesProps
> = ({ paymentType, handlePaymentType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack gap={"0.5rem"}>
      <HeaderWithBack
        title={t("payment.title")}
        handleClose={() => navigate("/")}
      />
      <Stack direction={"row"} gap={"1rem"} padding="0.5rem 1rem">
        {paymentButtons.map((button) => (
          <PaymentType
            key={button.type}
            active={paymentType === button.type}
            title={t(button.title)}
            icon={button.icon && button.icon}
            iconImages={button.iconImages && button.iconImages}
            PaymentType={button.type}
            handleClick={() => {
              handlePaymentType(
                button.type === 1 ? 2 : button.type === 2 ? 1 : button.type
              );
            }}
          />
        ))}
      </Stack>
      {/* <NotificationCreditModal
        open={creditModalOpen}
        handleClose={() => setCreditModalOpen(false)}
      /> */}
    </Stack>
  );
};
