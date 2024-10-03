import { SettingSwitchItem } from "@myCash/common";
import { AccountInfo, ISettingsSwitch } from "@myCash/types";
import { Bill, Notification, ReceiptAdd } from "iconsax-react";
import { useTranslation } from "react-i18next";
interface SystemSwitchSettingsProps extends ISettingsSwitch {
  accountInfo: AccountInfo;
}

export const SystemSwitchSettings: React.FC<SystemSwitchSettingsProps> = ({
  handleSwitch,
  accountInfo,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <SettingSwitchItem
        name={t("settings.quickInvoice")}
        status={accountInfo?.quickInvoice}
        icon={<ReceiptAdd size={24} />}
        handleSwitch={(checked) =>
          handleSwitch({ quickInvoice: checked ? "1" : "0" }, "settings")
        }
      />
      <SettingSwitchItem
        name={t("settings.notifications")}
        status={accountInfo?.notification}
        icon={<Notification size={24} />}
        handleSwitch={(checked) =>
          handleSwitch({ notification: checked ? "1" : "0" }, "settings")
        }
      />
      <SettingSwitchItem
        name={t("settings.drafts")}
        status={accountInfo?.drafts}
        icon={<Bill size={24} />}
        handleSwitch={(checked) =>
          handleSwitch({ drafts: checked ? "1" : "0" }, "settings")
        }
      />
    </>
  );
};
