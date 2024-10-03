import { CartSummaryItem } from "../cartSummaryItem";
import { CartTotal } from "../cardTotal";
import { PaymentSummaryContainer } from "./styles";
import { ReactNode } from "react";
import { RootState } from "@myCash/lib";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface PaymentSummaryProps {
  children?: ReactNode;
  payments: {
    total: number;
    totalAfterTax: number;
    totalDiscount: number;
    finalTotal: number;
    taxPercentage?: number;
  };
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  children,
  payments,
}) => {
  const { t } = useTranslation();
  const cartState = useSelector((state: RootState) => state.cart);
  return (
    <PaymentSummaryContainer>
      <Stack className="item">
        <CartSummaryItem
          title={t("invoice.summary.titleOne")}
          quantity={payments?.total?.toLocaleString()}
        />
        <CartSummaryItem
          title={t("invoice.summary.titleTwo", {
            tax: payments?.taxPercentage ?? cartState?.taxPercentage * 100,
          })}
          // quantity={payments.totalAfterTax.toLocaleString()}
          // quantity="0"
          quantity={payments.totalAfterTax?.toLocaleString()}
        />
        <CartSummaryItem
          title={t("invoice.summary.titleThree")}
          quantity={payments.totalDiscount.toLocaleString()}
        />
      </Stack>
      {children && children}
      <Stack>
        <CartTotal total={payments.finalTotal.toLocaleString()} />
      </Stack>
    </PaymentSummaryContainer>
  );
};
