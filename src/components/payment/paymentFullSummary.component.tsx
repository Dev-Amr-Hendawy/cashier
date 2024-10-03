import { Stack } from "@mui/material";
import { PaymentSummary, PaymentSummaryItem } from "@myCash/common";
import { CartSummaryItem } from "@myCash/common/cartSummaryItem";
import { RootState, setFinalPaymentTotal } from "@myCash/lib";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface PaymentFullSummaryProps {}

export const PaymentFullSummary: React.FC<PaymentFullSummaryProps> = () => {
  const { t } = useTranslation();
  const paymentState = useSelector((state: RootState) => state.payment);
  const { finalTotal, total, totalAfterTax, totalDiscount } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFinalPaymentTotal(finalTotal));
  }, [finalTotal, dispatch]);
  return (
    <PaymentSummary
      payments={{ finalTotal, total, totalAfterTax, totalDiscount }}
    >
      {/* Total payment cash */}
      {paymentState.paymentType == 1 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.cashTotal",
            quantity: paymentState.totalCash?.toLocaleString(),
          }}
        />
      )}
      {/* Total Payment visa */}
      {paymentState.paymentType == 2 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.visaTotal",
            quantity: paymentState.totalVisa?.toLocaleString(),
          }}
        />
      )}
      {/* Total payment credit */}
      {paymentState.paymentType == 3 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.totalPayment",
            quantity: paymentState.totalPaid?.toLocaleString(),
          }}
          secondItem={{
            title: "paymentInvoice.remaining",
            quantity: paymentState.totalRemaining.toLocaleString(),
          }}
        />
      )}
      {/* Payment cash/visa */}
      {paymentState.paymentType == 4 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.cashTotal",
            quantity: paymentState.totalCash?.toLocaleString(),
          }}
          secondItem={{
            title: "paymentInvoice.visaTotal",
            quantity: paymentState.totalVisa?.toLocaleString(),
          }}
        />
      )}
      {/* payment credit/visa */}
      {paymentState.paymentType == 5 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.visaTotal",
            quantity: paymentState.totalVisa?.toLocaleString(),
          }}
          secondItem={{
            title: "paymentInvoice.remaining",
            quantity: Number(
              Number(finalTotal) - Number(paymentState.totalPaid)
            ).toLocaleString(),
          }}
        />
      )}
      {/* Payment Date */}
      {(paymentState.paymentType == 3 || paymentState.paymentType == 5) && (
        <Stack className="item">
          <CartSummaryItem
            title={t("date")}
            quantity={paymentState.paymentDate.toLocaleString()}
          />
        </Stack>
      )}
    </PaymentSummary>
  );
};
