import { Stack, Typography } from "@mui/material";
import invoiceLogo from "@myCash/assets/icons/mycash-logo-small.svg";
import "./styles.scss";
import { useTranslation } from "react-i18next";

interface InvoiceTailProps {}

export const InvoiceTail: React.FC<InvoiceTailProps> = () => {
  const { t } = useTranslation();
  return (
    <Stack className="invoice-tail-container">
      <Stack className="invoice-tail-thanks">
        <Typography>{t("invoice.tailTahnks")}</Typography>
        <Typography>mycash system</Typography>
      </Stack>
      <Stack direction={"row"} gap={"4px"} alignItems={"center"}>
        <Typography>Powered By</Typography>

        <img
          src={invoiceLogo}
          alt="invoice-logo"
          loading="lazy"
          height={"15px"}
          width={"40px"}
        />
      </Stack>
    </Stack>
  );
};
