import { Typography } from "@mui/material";
// import { TickCircle } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { StyledTablePaymentCompleted } from "./styles";

interface TablePaymentCompletedProps {}

export const TablePaymentCompleted: React.FC<
  TablePaymentCompletedProps
> = () => {
  const { t } = useTranslation();
  return (
    <StyledTablePaymentCompleted >
      {/* <TickCircle size="20" color="#6EC531" /> */}
      <Typography>{t("salesInvoices.completedPayment")}</Typography>
    </StyledTablePaymentCompleted>
  );
};
