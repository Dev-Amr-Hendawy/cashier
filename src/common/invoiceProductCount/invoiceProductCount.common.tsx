import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./styles.scss";

interface InvoiceProductCountProps {
  count: number | string;
}

export const InvoiceProductCount: React.FC<InvoiceProductCountProps> = ({
  count,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="invoice-product-count">
      <Typography variant="h6">{`${count}X`}</Typography>
      <Typography variant="h6">{t("client.product")}</Typography>
    </Stack>
  );
};
