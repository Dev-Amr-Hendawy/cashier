import { Typography } from "@mui/material";
import { StyledPaymentHeader } from "./styles";
import { useTranslation } from "react-i18next";

export const PaymentTableHeader = () => {
  const { t } = useTranslation();
  return (
    <StyledPaymentHeader>
      <Typography variant="h5" color="grey.400" textAlign="start">
        {t("product")}
      </Typography>
      <Typography variant="h5" color="grey.400" textAlign="center">
        {t("quantity")}
      </Typography>
      <Typography variant="h5" color="grey.400" textAlign="center">
        {t("discount")}
      </Typography>
      <Typography variant="h5" color="grey.400" textAlign="end">
        {t("price")}
      </Typography>
    </StyledPaymentHeader>
  );
};
