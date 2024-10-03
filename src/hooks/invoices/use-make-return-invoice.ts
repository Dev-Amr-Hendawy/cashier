import { RootState, clearCart, resetPayments } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { createInvoice } from "@myCash/apis";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

export const useMakeReturnInvoice = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const returnInvoiceState = useSelector(
    (state: RootState) => state.returnInvoice
  );
  const branchMain = useSelector(
    (state: RootState) => state.user.mainBranch
  );

  //   const reverseDateString = (notValidDate: string): string => {
  //     // from "27-3-2024" to  a date
  //     if (!notValidDate) return "";
  //     const [day, month, year] = notValidDate
  //       .split("-")
  //       .map((item) => parseInt(item));
  //     const invoiceDate = new Date(year, month - 1, day);
  //     return format(invoiceDate, "yyyy-MM-dd");
  //   };

  // higher order function
  const handleInvoiceValuesBeforeSubmit = () => {
    type ProductTypeForReturn = {
      product_id: string;
      quantity: number;
      // invoiceDiscountValue: string;
      // invoiceDiscountType: string;
    };
    const products: ProductTypeForReturn[] = [];
    if (returnInvoiceState?.invoice?.products) {
      returnInvoiceState?.invoice?.products.map((product) => {
        products.push({
          product_id: String(product.product.id),
          quantity: Number(product.quantity),
          // invoiceDiscountValue: "0",
          // invoiceDiscountType: "0",
        });
      });
    }
    // if (!invoice_client) {
    //   toast.error(t("payment.error.client"));
    //   return;
    // }
    // if (
    //   paymentType === PAYMENT_TYPE.CASH ||
    //   paymentType === PAYMENT_TYPE.VISA
    // ) {
    //   if (totalPaid < finalTotal) {
    //     toast.error(t("payment.error.total"));
    //     return;
    //   }
    // }
    // if (paymentType === 4 && totalPaid !== finalTotal) {
    //   toast.error(t("payment.error.totalWrong"));
    //   return;
    // }
    // const cashPrice =
    //   paymentType === PAYMENT_TYPE.CASH ? finalTotal : cash > 0 ? cash : "";
    // const visaPrice =
    //   paymentType === PAYMENT_TYPE.VISA ? finalTotal : visa > 0 ? visa : "";

    return makeInvoiceMutation.mutate({
      //  cashPrice: `${returnInvoiceState?.invoice?.totalPrice}`,
      //   cashPrice: String(cashPrice),
      //   visaPrice: String(visaPrice),
      //   nextData: reverseDateString(nextDate) || "",
      
      client_id: String(returnInvoiceState.invoice?.client?.id || ""),
      products: JSON.stringify(products),
        invoiceType: String(returnInvoiceState?.invoice?.invoiceType),
        paymentType: String(returnInvoiceState?.invoice?.paymentType),
        saleOrBuy:  String(returnInvoiceState?.invoice?.saleOrBuy),
         visaPrice: String(returnInvoiceState?.invoice?.visaPrice), 
          cashPrice: String(returnInvoiceState?.invoice?.cashPrice),
      invoice_id: String(returnInvoiceState.invoice?.id),
      branch_id:String(branchMain?.id)
    });
  };

  const makeInvoiceMutation = useMutation({
    mutationFn: (values: { [key: string]: string }) => createInvoice(values),
    onSuccess: (data) => {
      if (data?.data?.status === 0) {
        toast.error(data?.data?.message);
      } else {
        // navigate(`/payment-details/${data?.data?.data?.id}`);
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
