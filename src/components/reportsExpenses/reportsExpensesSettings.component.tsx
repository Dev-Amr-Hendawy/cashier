import { HeaderWithMoreIcon } from "@myCash/common";
import { useTranslation } from "react-i18next";

interface ReportsExpensesSettingsProps {}

export const ReportsExpensesSettings: React.FC<
  ReportsExpensesSettingsProps
> = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderWithMoreIcon title={t("expenses.expensesDetails")} hideMore />
    </>
  );
};
