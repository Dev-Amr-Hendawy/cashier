import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import { SettingSwitchItem } from "@myCash/common";
import { I3Dcube, People, TagUser } from "iconsax-react";
import { INVOICE_TYPE } from "@myCash/constants";
import { IInvoiceSettings, ISettingsSwitch } from "@myCash/types";

interface InvoiceSettingsOthersProps extends ISettingsSwitch {
  simpleInvoice: IInvoiceSettings;
  taxInvoice: IInvoiceSettings;
  invoiceType: number;
}

export const InvoiceSettingsOthers: React.FC<InvoiceSettingsOthersProps> = ({
  simpleInvoice,
  taxInvoice,
  handleSwitch,
  invoiceType,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h4">{t("settings.system")}</Typography>
      <Stack gap={"12px"}>
        <SettingSwitchItem
          name={t("settings.productDesc")}
          status={
            invoiceType === INVOICE_TYPE.SIMPLE
              ? simpleInvoice?.productDesc
              : taxInvoice?.productDesc
          }
          icon={<I3Dcube size={24} />}
          handleSwitch={(checked) =>
            handleSwitch(
              {
                productDesc: checked ? "1" : "0",
                type: invoiceType.toLocaleString(),
              },
              "values"
            )
          }
        />
        <SettingSwitchItem
          name={t("settings.clientsData")}
          status={
            invoiceType === INVOICE_TYPE.SIMPLE
              ? simpleInvoice?.client
              : taxInvoice?.client
          }
          icon={<People size={24} />}
          handleSwitch={(checked) =>
            handleSwitch(
              {
                client: checked ? "1" : "0",
                type: invoiceType.toLocaleString(),
              },
              "values"
            )
          }
        />
        <SettingSwitchItem
          name={t("settings.cashierData")}
          status={
            invoiceType === INVOICE_TYPE.SIMPLE
              ? simpleInvoice?.cashier
              : taxInvoice?.cashier
          }
          icon={<TagUser size={24} />}
          handleSwitch={(checked) =>
            handleSwitch(
              {
                cashier: checked ? "1" : "0",
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
