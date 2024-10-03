import { CommonModal, RadioLabel } from "@myCash/common";

import { Box } from "@mui/material";
import { CalendarCircle } from "iconsax-react";
import DatePicker from "../form/DatePicker";
import { format } from "date-fns";
import { setQuickInvoiceDate } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PaymentCreditModalProps {
  open: boolean;
  handleClose: () => void;
}

export const QuickInvoiceCreditModal: React.FC<PaymentCreditModalProps> = ({
  handleClose,
  open,
}) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<string>("");
  const dispatch = useDispatch();
  return (
    <CommonModal
      title={t("payment.date-credit-payment")}
      hasActions={true}
      open={open}
      buttonsNames={{ action: t("add"), cancel: t("cancel") }}
      handleClose={handleClose}
      handleConfirm={() => {
        dispatch(setQuickInvoiceDate(date));
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
        <RadioLabel
          title={t("payment.creditPaymentDate")}
          icon={<CalendarCircle size="32" color="#2D2D2D66" />}
        />
      </Box>
      <DatePicker
        onChange={(date) => setDate(format(date, "dd-MM-yyy"))}
        fullWidth
        disablePast
      />
    </CommonModal>
  );
};
