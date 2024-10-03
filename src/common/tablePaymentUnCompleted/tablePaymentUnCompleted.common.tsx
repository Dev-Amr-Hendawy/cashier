import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledTablePaymentUnCompleted } from "./styles";

interface TablePaymentUnCompletedProps {}

export const TablePaymentUnCompleted: React.FC<
  TablePaymentUnCompletedProps
> = () => {
  const { t } = useTranslation();
  return (
    <StyledTablePaymentUnCompleted>
      <Typography>{t("salesInvoices.uncompletedPayment")}</Typography>
    </StyledTablePaymentUnCompleted>
  );
};
