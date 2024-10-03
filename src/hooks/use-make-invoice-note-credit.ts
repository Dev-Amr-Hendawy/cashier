import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";

import { PAYMENT_TYPE } from "@myCash/constants";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useMakeInvoiceNotification } from "@myCash/hooks";

export const useMakeInvoiceNoteCredit = () => {
  const { t } = useTranslation();

  const { totalPaid, paymentType } = useSelector((state: RootState) => state.payment);
  const { invoice, invoice_id, products, type } = useSelector(
    (state: RootState) => state.invoiceSendNotification
  );

  const { mutate: mutateNotification, isPending: isPendingNotification, isSuccess: isSuccessNotification } = useMakeInvoiceNotification();

  const handleInvoiceValuesBeforeSubmit = () => {
    if (!invoice) {
      toast.error(t("error"));
      return;
    }

    if (paymentType === PAYMENT_TYPE.CASH && totalPaid < Number(invoice.totalPrice ?? 0)) {
      toast.error(t("payment.error.total"));
      return;
    }

    const cashPrice = paymentType === PAYMENT_TYPE.CASH
      ? totalPaid
      : Number(invoice.totalPrice ?? 0) > 0
        ? Number(invoice.totalPrice)
        : "";
    const visaPrice = paymentType === PAYMENT_TYPE.VISA ? invoice.totalPrice : "";

    mutateNotification({
      cash: cashPrice,
      visa: visaPrice,
      invoice_id: invoice_id,
      products: products,
      type: type,
      paymentType: paymentType,
    });
  };

  return {
    handleInvoiceValuesBeforeSubmit,
    isPendingNotification,
    isSuccessNotification,
  };
};

