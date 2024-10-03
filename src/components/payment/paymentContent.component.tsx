import {
  CalculatorSide,
  PaymentActions,
  PaymentMainInfo,
  PaymentTypesButtons,
} from "@myCash/components";
import { PaymentActionButton, PaymentLayout } from "@myCash/common";
import { RootState, clearCart, deleteProduct } from "@myCash/lib";
import { TickCircle, Trash } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
import { StyledMainSide } from "./styles";
import { useMakeInvoice } from "@myCash/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PaymentContent = () => {
  const { t } = useTranslation();

  const cartState = useSelector((state: RootState) => state.cart);
  const paymentState = useSelector((state: RootState) => state.payment);

  const dispatch = useDispatch();

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };
  const handleResetPayments = () => {
    dispatch(clearCart());
  };

  const navigate = useNavigate();
  const { handleInvoiceValuesBeforeSubmit, makeInvoiceMutation } =
    useMakeInvoice();

  return (
    <PaymentLayout
      mainSide={
        <StyledMainSide>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              gridColumn: "1/7",
              gridRow: "1/2",
            }}
          >
            <PaymentTypesButtons />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              gridColumn: "6/7",
              gridRow: "2/10",
            }}
          >
            <PaymentActions>
              <PaymentActionButton
                title={t("payment.delete-all")}
                onClick={() => {
                  dispatch(clearCart());
                  navigate("/");
                }}
                icon={<Trash size="32" />}
                bcgColor="#2D2D2D99"
              />
              <PaymentActionButton
                title={t("confirm")}
                onClick={() => {
                  handleInvoiceValuesBeforeSubmit();
                }}
                icon={<TickCircle size="32" />}
                bcgColor="#232773"
                loading={makeInvoiceMutation.isPending}
              />
            </PaymentActions>
          </Box>
          <PaymentMainInfo
            mainState={cartState}
            handleDeleteProduct={handleDeleteProduct}
            handleResetPayments={handleResetPayments}
          />
        </StyledMainSide>
      }
      aside={paymentState.paymentType !== 2 && <CalculatorSide />}
    />
  );
};

// const mutationObject = handleInvoiceValuesBeforeSubmit(
//   paymentState.totalCash,
//   paymentState.totalVisa,
//   cartState.products,
//   format(new Date(), "dd-MM-yyyy"),
//   cartState.invoice_client?.client_id,
//   paymentState.paymentType
// );
// if (!cartState.invoice_client) {
//   toast.error(t("payment.error.client"));
//   return;
// }
// if (
//   paymentState.paymentType === 1 ||
//   paymentState.paymentType === 2 ||
//   paymentState.paymentType === 4
// ) {
//   if (paymentState.totalPaid < cartState.finalTotal) {
//     toast.error(t("payment.error.total"));
//     return;
//   }
// }
// mutate();
