import { PaymentSummary, PaymentSummaryItem } from "@myCash/common";
import { RootState, setFinalPaymentTotal } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { CartSummaryItem } from "@myCash/common/cartSummaryItem";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PaymentFullSummaryProps {}

export const QuickInvoiceSummary: React.FC<PaymentFullSummaryProps> = () => {
  const { t } = useTranslation();
  const { finalTotal, total, totalTax, paymentType, totalCash, totalPaid, totalRemaining, totalVisa, date } =
    useSelector((state: RootState) => state.quickInvoice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFinalPaymentTotal(finalTotal));
  }, [finalTotal, dispatch]);
  return (
    <PaymentSummary payments={{ total: total, totalAfterTax: totalTax, totalDiscount: 0, finalTotal }}>
      {/* Total payment cash */}
      {paymentType == 1 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.cashTotal",
            quantity: totalCash?.toLocaleString(),
          }}
        />
      )}
      {/* Total Payment visa */}
      {paymentType == 2 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.visaTotal",
            quantity: totalVisa?.toLocaleString(),
          }}
        />
      )}
      {/* Total payment credit */}
      {paymentType == 3 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.totalPayment",
            quantity: totalPaid?.toLocaleString(),
          }}
          secondItem={{
            title: "paymentInvoice.remaining",
            quantity: totalRemaining.toLocaleString(),
          }}
        />
      )}
      {/* Payment cash/visa */}
      {paymentType == 4 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.cashTotal",
            quantity: totalCash?.toLocaleString(),
          }}
          secondItem={{
            title: "paymentInvoice.visaTotal",
            quantity: totalVisa?.toLocaleString(),
          }}
        />
      )}
      {/* payment credit/visa */}
      {paymentType == 5 && (
        <PaymentSummaryItem
          firstItem={{
            title: "paymentInvoice.visaTotal",
            quantity: totalVisa?.toLocaleString(),
          }}
          secondItem={{
            title: "paymentInvoice.remaining",
            quantity: Number(Number(finalTotal) - Number(totalPaid)).toLocaleString(),
          }}
        />
      )}
      {/* Payment Date */}
      {(paymentType == 3 || paymentType == 5) && (
        <Stack className="item">
          <CartSummaryItem title={t("date")} quantity={date.toLocaleString()} />
        </Stack>
      )}
    </PaymentSummary>
  );
};
