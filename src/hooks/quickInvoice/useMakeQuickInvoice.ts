import { RootState, resetQuickInvoice } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { PAYMENT_TYPE } from "@myCash/constants";
import { createQuickInvoice } from "@myCash/apis";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// import { getPaymentProducts } from "@myCash/utils";

export const useMakeQuickInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { finalTotal, invoice_client, products } = useSelector(
    (state: RootState) => state.quickInvoice
  );
  const {
    totalCash: cash,
    totalPaid,
    totalVisa: visa,
    paymentType,
    date: nextDate,
  } = useSelector((state: RootState) => state.quickInvoice);
  const branchMain = useSelector(
    (state: RootState) => state.user.mainBranch
  );
  const reverseDateString = (notValidDate: string): string => {
    // from "27-3-2024" to  a date
    if (!notValidDate) return "";
    const [day, month, year] = notValidDate
      .split("-")
      .map((item) => parseInt(item));
    const invoiceDate = new Date(year, month - 1, day);
    return format(invoiceDate, "yyyy-MM-dd");
  };

  // higher order function
  const handleInvoiceValuesBeforeSubmit = () => {
    // if (!invoice_client) {
    //   toast.error(t("payment.error.client"));
    //   return;
    // }
    if (
      paymentType === PAYMENT_TYPE.CASH ||
      paymentType === PAYMENT_TYPE.VISA
    ) {
      if (totalPaid < finalTotal) {
        toast.error(t("payment.error.total"));
        return;
      }
    }
    if (paymentType === 4 && totalPaid !== finalTotal) {
      toast.error(t("payment.error.totalWrong"));
      return;
    }
    // const cashPrice =
    //   paymentType === PAYMENT_TYPE.CASH ? finalTotal : cash > 0 ? cash : "";
    const cashPrice = paymentType === PAYMENT_TYPE.CASH && cash > 0 ? cash : "";
    // const visaPrice =
    //   paymentType === PAYMENT_TYPE.VISA ? finalTotal : visa > 0 ? visa : "";
    const visaPrice = paymentType === PAYMENT_TYPE.VISA && visa > 0 ? visa : "";

    return makeInvoiceMutation.mutate({
      cashPrice: String(cashPrice),
      visaPrice: String(visaPrice),
      nextData: reverseDateString(nextDate) || "",
      client_id: invoice_client?.id ? String(invoice_client?.id) : "",
      products: JSON.stringify(products),
      invoiceType: "1",
      paymentType: String(paymentType),
      branch_id:String(branchMain?.id)
    });
  };

  const makeInvoiceMutation = useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      createQuickInvoice(values),
    onSuccess: (data) => {
      if (data?.data?.status === 0) {
        toast.error(data?.data?.message);
      } else {
        navigate(`/payment-details/${data?.data?.data?.id}`);
        // dispatch(clearQuickInvoice());
        dispatch(resetQuickInvoice());
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { makeInvoiceMutation, handleInvoiceValuesBeforeSubmit };
};
