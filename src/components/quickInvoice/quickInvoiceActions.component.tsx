import { RootState, setProductModal } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { AddClientQuickInvoice } from "./AddClientQuickInvoice.component";
import { PaymentAddWithModal } from "@myCash/common/paymentAddWithModal";
// import { PaymentDiscountModal } from "..";
import { QuickProduct } from "./quickProduct.component";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PaymentActionsProps {
  children: React.ReactNode;
}

export const QuickInvoiceActions: React.FC<PaymentActionsProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.quickInvoice);
  const [open, setOpen] = useState(false);
  // const [discountModal, setDiscountModal] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  return (
    // TODO:: reconsider structure and hoc
    <Stack gap={"0.5rem"} padding={"0.5rem"}>
      <PaymentAddWithModal
        title={t("payment.add-products")}
        onClick={() => {
          //   navigate("/");
          dispatch(setProductModal(true));
        }}
      />
      <QuickProduct />
      <PaymentAddWithModal
        title={t("payment.add-client")}
        onClick={handleOpen}
      />
      <AddClientQuickInvoice
        t={t}
        cartState={cartState}
        handleClose={handleClose}
        // handleOpen={handleOpen}
        open={open}
        hideButtonHandler={true}
      />
      {/* <PaymentAddWithModal title={t("payment.add-discount")} onClick={() => setDiscountModal(true)} /> */}
      {/* <PaymentDiscountModal open={discountModal} handleClose={() => setDiscountModal(false)} /> */}
      {/* <PaymentAddWithModal title={t("payment.add-reservation")} onClick={() => {}} /> */}
      {/* pass here action buttons  */}
      {children}
    </Stack>
  );
};
