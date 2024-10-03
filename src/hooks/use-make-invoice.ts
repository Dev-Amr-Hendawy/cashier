import { RootState, clearCart, resetPayments } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { PAYMENT_TYPE } from "@myCash/constants";
import { createInvoice } from "../apis";
import { format } from "date-fns";
import { getPaymentProducts } from "@myCash/utils";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useMakeInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    finalTotal,
    invoiceType,
    invoiceTaxType,
    invoice_client,
    products,
    sellInvoiceData,
  } = useSelector((state: RootState) => state.cart);
  const {
    totalCash: cash,
    totalPaid,
    // totalVisa: visa,
    paymentType,
    paymentDate: nextDate,
  } = useSelector((state: RootState) => state.payment);
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
      paymentType === PAYMENT_TYPE.CASH
      // ||
      // paymentType === PAYMENT_TYPE.VISA
    ) {
      if (totalPaid < finalTotal) {
        toast.error(t("payment.error.total"));
        return;
      }
    }
    if (paymentType === 4 && totalPaid < finalTotal) {
      toast.error(t("payment.error.totalWrong"));
      return;
    }
    const cashPrice =
      paymentType === PAYMENT_TYPE.CASH ? totalPaid : cash > 0 ? cash : "";
    // const cashPrice = paymentType === PAYMENT_TYPE.CASH && cash > 0 ? cash : "";
    const visaPrice = paymentType === PAYMENT_TYPE.VISA ? finalTotal : "";
    // paymentType === PAYMENT_TYPE.VISA ? totalPaid : visa > 0 ? visa : "";
    // const visaPrice = paymentType === PAYMENT_TYPE.VISA && visa > 0 ? visa : "";

    return makeInvoiceMutation.mutate({
      cashPrice: String(cashPrice),
      visaPrice: String(visaPrice),
      nextData: reverseDateString(nextDate) || "",
      client_id: invoice_client?.id ? String(invoice_client?.id) : "",
      products: JSON.stringify(getPaymentProducts(products)),
      invoiceType: String(invoiceTaxType),
      saleOrBuy: String(invoiceType),
      referenceNumber: String(sellInvoiceData?.referenceNumber || ""),
      referenceDate: String(sellInvoiceData?.referenceDate || ""),
      note: String(sellInvoiceData?.note || ""),
      paymentType: String(paymentType),
      branch_id:String(branchMain?.id)

    });
  };

  const makeInvoiceMutation = useMutation({
    mutationFn: (values: { [key: string]: string }) => createInvoice(values),
    onSuccess: (data) => {
      if (data?.data?.status === 0) {
        toast.error(data?.data?.message);
      } else {
        navigate(`/payment-details/${data?.data?.data?.id}`);
        dispatch(clearCart());
        dispatch(resetPayments());
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { makeInvoiceMutation, handleInvoiceValuesBeforeSubmit };
};
