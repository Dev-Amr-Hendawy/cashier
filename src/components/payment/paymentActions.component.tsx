import { AddClientContent, PaymentDiscountModal } from "..";

import { PaymentAddWithModal } from "@myCash/common/paymentAddWithModal";
import { ProductModal } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PaymentActionsProps {
  children: React.ReactNode;
}

export const PaymentActions: React.FC<PaymentActionsProps> = ({ children }) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    // TODO:: reconsider structure and hoc
    <Stack gap={"0.5rem"} padding={"0.5rem"}>
      <PaymentAddWithModal
        title={t("payment.add-products")}
        onClick={() => {
          navigate("/");
          // dispatch(productsActions.openProductsForm());
        }}
      />
      <ProductModal />
      <PaymentAddWithModal title={t("payment.add-client")} onClick={handleOpen} />
      <AddClientContent
        t={t}
        cartState={cartState}
        handleClose={handleClose}
        // handleOpen={handleOpen}
        open={open}
        hideButtonHandler={true}
      />
      <PaymentAddWithModal title={t("payment.add-discount")} onClick={() => setDiscountModal(true)} />
      <PaymentDiscountModal open={discountModal} handleClose={() => setDiscountModal(false)} />
      {/* <PaymentAddWithModal title={t("payment.add-reservation")} onClick={() => {}} /> */}
      {/* pass here action buttons  */}
      {children}
    </Stack>
  );
};
