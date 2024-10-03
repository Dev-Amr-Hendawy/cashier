import { HeaderWithMoreIcon } from "@myCash/common";
import { useState } from "react";
import { ReportsSalesSettingsModal } from "./reportsSalesSettingsModal.component";
import { t } from "i18next";
import { Stack } from "@mui/material";

interface ReportsSalesSettingsProps {}

export const ReportsSalesSettings: React.FC<ReportsSalesSettingsProps> = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <Stack className="reports-sales-settings">
      <HeaderWithMoreIcon
        title={t("reports.title")}
        onClick={() => setSettingsOpen(true)}
      />
      <ReportsSalesSettingsModal
        handleClose={() => setSettingsOpen(false)}
        open={settingsOpen}
      />
    </Stack>
  );
};
