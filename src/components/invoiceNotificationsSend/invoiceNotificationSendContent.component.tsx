import { useEffect, useState } from "react";

import { Stack } from "@mui/material";
import { NotificationInvoice } from "@myCash/types";
import { NotificationMainInfo } from "@myCash/components";

import "./styles.scss";
import { calculateInvoiceNotification } from "@myCash/utils";
import { useMakeInvoiceNotification } from "@myCash/hooks";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { setInvoiceId, setInvoiceSendNotification } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface InvoiceNotificationSendContentProps {
  invoice: NotificationInvoice;
  btnSubmitRef?: React.MutableRefObject<HTMLButtonElement | null>;
  handleClose?: () => void;
}

export const InvoiceNotificationSendContent: React.FC<
  InvoiceNotificationSendContentProps
> = ({ invoice: invoiceApi, btnSubmitRef, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const newInvoiceWithOutProductHasNate = {
    ...invoiceApi,
    products: invoiceApi.products.filter((product) => (!product.hasNotification&&Number(product.quantity) > 0)),
  };

  const [invoice, setInvoice] = useState(newInvoiceWithOutProductHasNate);
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMakeInvoiceNotification();

  // TODO::refac and remove all map methods
  const handleDeleteProduct = (id: number) => {
    if (!invoice) return;
    const filteredProducts = invoice?.products?.filter(
      (product) => product.id !== id
    );
    const { totalPrice, taxPrice } = calculateInvoiceNotification(
      filteredProducts,
      invoice.tax
    );
    setInvoice({
      ...invoice,
      products: filteredProducts,
      totalPrice,
      taxPrice,
    });
  };
  const handleProductQuantity = (id: number, amount: number) => {
    if (!invoice) return;
    const apiProduct = invoiceApi?.products?.find(
      (product) => product.id === id
    );
    const mappedProducts = invoice?.products?.map((product) => {
      if (product.id === id) {
        // check for amount with product
        if (
          amount > Number(apiProduct?.quantity) ||
          amount + Number(product.quantity) <= 0
        ) {
          return product;
        } else {
          return { ...product, quantity: amount.toLocaleString() };
        }
      }
      return product;
    });
    setInvoice({ ...invoice, products: mappedProducts });
  };
  const handleProductPrice = (id: number, price: number) => {
    if (!invoice) return;
    const mappedProducts = invoice?.products?.map((product) => {
      if (product.id === id) {
        product.notificationPrice = price;
      }
      return product;
    });
    invoice.totalPrice = 0;
    invoice.taxPrice = 0;
    const { totalPrice, taxPrice } = calculateInvoiceNotification(
      mappedProducts,
      invoice.tax
    );
    setInvoice({ ...invoice, products: mappedProducts, totalPrice, taxPrice });
  };

  const handleTypeSelect = (type: 1 | 2) => {
    console.log("type", type);
    setInvoice({
      ...invoice,
      type: type,
    });
  };
  const handleInvoiceNotificationSubmit = () => {
    const refinedProducts = [];
    for (let index = 0; index < invoice?.products.length; index++) {
      const product = invoice?.products[index];
      if (
        product.notificationPrice &&
        Number(product.notificationPrice) !== 0
      ) {
        refinedProducts.push({
          product_id: product.product.id,
          quantity: Number(product.quantity),
          price: product?.notificationPrice ?? 0,
        });
      } else {
        toast.error(`${t("Please")} ${t("invoice.selectPriceItem")}`);
        return;
      }
    }
    if (refinedProducts.length === 0) {
      toast.error("Please add price to products");
      return;
    }
    if (!invoice.type) {
      toast.error("Please select notification type");
      return;
    } else if (invoice.type === 1) {
      mutate({
        cash:
          invoice.paymentTypeSent === 2
            ? invoice.totalPrice.toLocaleString()
            : "",
        visa: "",
        invoice_id: invoice.invoiceId,
        products: refinedProducts,
        type: invoice.type,
        paymentType: 1, //2=>visa , 1=>cash , 3->cash and visa
      });
    } else if (invoice.type === 2) {
      dispatch(
        setInvoiceSendNotification({
          products: refinedProducts,
          invoice: invoice,
          invoice_id: invoice.invoiceId,
          type: invoice.type,
        })
      );
      navigate(`/payment-notification/`);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const Id = invoice.invoiceId;
      dispatch(setInvoiceId(invoice.invoiceId - 1));
      setTimeout(() => {
        dispatch(setInvoiceId(Id));
        handleClose && handleClose();
      }, 200);
    }
  }, [dispatch, invoice.invoiceId, isSuccess]);

  return (
    <Stack>
      {invoice && (
        <NotificationMainInfo
          invoice={invoice}
          handleDeleteProduct={handleDeleteProduct}
          handleProductQuantity={handleProductQuantity}
          handleProductPrice={handleProductPrice}
          handleInvoiceNotificationSubmit={handleInvoiceNotificationSubmit}
          isSubmitPending={isPending}
          handleTypeSelect={handleTypeSelect}
          btnSubmitRef={btnSubmitRef}
        />
      )}
    </Stack>
  );
};

{
  /* <Box
          sx={{
            width: "100%",
            height: "100%",
            gridColumn: "1/7",
            gridRow: "1/2",
          }}
        >
          <NotificationPaymentTypes
            paymentType={invoice?.paymentType}
            handlePaymentType={handlePaymentType}
          />
        </Box> */
}
// <PaymentLayout
//   mainSide={
//     <Stack>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           gridColumn: "1/7",
//           gridRow: "1/2",
//         }}
//       >
//         <NotificationPaymentTypes />
//       </Box>
//       {invoice && (
//         <NotificationMainInfo
//           invoice={invoice}
//           handleDeleteProduct={handleDeleteProduct}
//           handleProductQuantity={handleProductQuantity}
//           handleProductPrice={handleProductPrice}
//         />
//       )}
//     </Stack>
//   }
//   aside={<CalculatorSide />}
// />
