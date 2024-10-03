import { HeaderWithMoreIcon } from "@myCash/common";
import { useTranslation } from "react-i18next";

interface ReportsBuySettingsProps {}

export const ReportsBuySettings: React.FC<ReportsBuySettingsProps> = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderWithMoreIcon title={t("reports.buyInvoicesDetails")} hideMore />
    </>
  );
};
