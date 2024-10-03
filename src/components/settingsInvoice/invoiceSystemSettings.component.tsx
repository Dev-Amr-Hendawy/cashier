import { Stack, Typography } from "@mui/material";
import { SettingSwitchValue } from "@myCash/common";
import { ISettings, ISettingsSwitch } from "@myCash/types";
import {
  Document,
  ReceiptDiscount,
  ReceiptEdit,
  ShieldSecurity,
} from "iconsax-react";
import { useTranslation } from "react-i18next";

interface InvoiceSystemSettingsProps extends ISettingsSwitch {
  settings: ISettings;
}

export const InvoiceSystemSettings: React.FC<InvoiceSystemSettingsProps> = ({
  handleSwitch,
  settings,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h4">{t("settings.systemSettings")}</Typography>
      <Stack gap={"12px"}>
        <SettingSwitchValue
          icon={<ReceiptEdit size={24} />}
          name={t("settings.commercialRecord")}
          status={settings?.name}
          value={settings?.accountInfo?.commercialRecordName}
          handleSwitch={(checked) =>
            handleSwitch({ name: checked ? "1" : "0" }, "settings")
          }
        />
        <SettingSwitchValue
          icon={<Document size={24} />}
          name={t("settings.commercialRecordNumber")}
          status={settings?.commercialRecord}
          value={settings?.accountInfo?.commercialRecord}
          handleSwitch={(checked) =>
            handleSwitch({ commercialRecord: checked ? "1" : "0" }, "settings")
          }
        />
        <SettingSwitchValue
          icon={<ShieldSecurity size={24} />}
          name={t("settings.taxRecord")}
          status={settings?.taxRecord}
          value={settings?.accountInfo?.taxRecord}
          handleSwitch={(checked) =>
            handleSwitch({ taxRecord: checked ? "1" : "0" }, "settings")
          }
        />
        <SettingSwitchValue
          icon={<ReceiptDiscount size={24} />}
          name={t("settings.taxVat")}
          status={settings?.tax}
          value={settings?.accountInfo?.tax}
          handleSwitch={(checked) =>
            handleSwitch({ tax: checked ? "1" : "0" }, "settings")
          }
        />
      </Stack>
    </>
  );
};
