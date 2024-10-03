import { Stack, Typography } from "@mui/material";
import { SettingSwitchItem } from "@myCash/common";
import { INVOICE_TYPE } from "@myCash/constants";
import { IInvoiceSettings, ISettingsSwitch } from "@myCash/types";
import { Barcode, ScanBarcode } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface InvoiceQrSettingsProps extends ISettingsSwitch {
  simpleInvoice: IInvoiceSettings;
  taxInvoice: IInvoiceSettings;
  invoiceType: number;
}

export const InvoiceQrSettings: React.FC<InvoiceQrSettingsProps> = ({
  simpleInvoice,
  taxInvoice,
  invoiceType,
  handleSwitch,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h4">{t("settings.qr")}</Typography>
      <Stack gap={"12px"}>
        <SettingSwitchItem
          icon={<ScanBarcode size={24} />}
          name="ZATCA QR"
          status={
            invoiceType === INVOICE_TYPE.SIMPLE
              ? simpleInvoice?.zatcaQr
              : taxInvoice?.zatcaQr
          }
          handleSwitch={(checked) =>
            handleSwitch(
              {
                zatcaQr: checked ? "1" : "0",
                type: invoiceType.toLocaleString(),
              },
              "values"
            )
          }
        />
        <SettingSwitchItem
          icon={<Barcode size={24} />}
          name="myCASH QR"
          status={
            invoiceType === INVOICE_TYPE.SIMPLE
              ? simpleInvoice?.myCashQr
              : taxInvoice?.myCashQr
          }
          handleSwitch={(checked) =>
            handleSwitch(
              {
                myCashQr: checked ? "1" : "0",
                type: invoiceType.toLocaleString(),
              },
              "values"
            )
          }
        />
      </Stack>
    </>
  );
};
