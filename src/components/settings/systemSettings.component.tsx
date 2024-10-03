import { Stack, Typography } from "@mui/material";
import { InvoiceSettingItem } from "@myCash/common";
import { ExternalDrive, Printer, ReceiptText, Wallet } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface SystemSettingsProps {
  children: ReactNode;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h4">{t("settings.system")}</Typography>
      <Stack gap={"12px"}>
        <InvoiceSettingItem
          icon={<ReceiptText size={24} />}
          name={t("settings.invoiceSettings")}
          id={"invoice-settings"}
          onClick={() => navigate("/settings/invoice")}
        />
        <InvoiceSettingItem
          icon={<Printer size={24} />}
          name={t("settings.printer")}
          id={"printer"}
          onClick={() => navigate("/settings/print")}
        />
        <InvoiceSettingItem
          icon={<Wallet size={24} />}
          name={t("settings.paymentMethods")}
          id={"payment-methods"}
          value="Soon"
        />
        <InvoiceSettingItem
          icon={<ExternalDrive size={24} />}
          name={t("settings.deviceInfo")}
          id={"device-info"}
          onClick={() => navigate("/settings/device")}
        />
        {children}
      </Stack>
    </>
  );
};
