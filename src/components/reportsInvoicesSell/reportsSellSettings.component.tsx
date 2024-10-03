import { HeaderWithMoreIcon } from "@myCash/common";
import { useTranslation } from "react-i18next";

interface ReportsSellSettingsProps {}

export const ReportsSellSettings: React.FC<
  ReportsSellSettingsProps
> = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderWithMoreIcon title={t("reports.sellInvoicesDetails")} hideMore />
    </>
  );
};
