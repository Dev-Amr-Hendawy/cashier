import { Box } from "@mui/material";
import { CommonModal, RadioLabel, SearchField } from "@myCash/common";
import { TicketDiscount } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface PaymentDiscountModalProps {
  open: boolean;
  handleClose: () => void;
}

export const PaymentDiscountModal: React.FC<PaymentDiscountModalProps> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  return (
    <CommonModal
      title={t("paymentInvoice.discountCard")}
      hasActions={true}
      open={open}
      buttonsNames={{ action: t("add"), cancel: t("cancel") }}
      handleClose={handleClose}
      handleConfirm={() => {
        // dispatch(setPaymentDate(date));
        handleClose();
      }}
    >
      <Box
        sx={{
          "& .MuiTypography-root": {
            fontSize: "1.25rem",
          },
        }}
      >
        <RadioLabel title={t("paymentInvoice.discountCoupon")} icon={<TicketDiscount size="32" color="#2D2D2D66" />} />
      </Box>
      <SearchField label="paymentInvoice.addDiscountCoupon" disableSearchIcon />
    </CommonModal>
  );
};
