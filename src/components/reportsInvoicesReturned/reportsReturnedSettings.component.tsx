import { HeaderWithMoreIcon } from "@myCash/common";
import { useTranslation } from "react-i18next";

interface ReportsReturnedSettingsProps {}

export const ReportsReturnedSettings: React.FC<
  ReportsReturnedSettingsProps
> = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderWithMoreIcon title={t("reports.sellInvoicesDetails")} hideMore />
    </>
  );
};
