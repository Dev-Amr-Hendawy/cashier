import { HeaderWithMoreIcon } from "@myCash/common";
import { useState } from "react";
import { t } from "i18next";
import { Stack } from "@mui/material";
import { ReportsProductSettingsModal } from "@myCash/components";

interface ReportsProductSettingsProps {}

export const ReportsProductSettings: React.FC<
  ReportsProductSettingsProps
> = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <Stack className="reports-sales-settings">
      <HeaderWithMoreIcon
        title={t("reports.title")}
        onClick={() => setSettingsOpen(true)}
      />
      <ReportsProductSettingsModal
        handleClose={() => setSettingsOpen(false)}
        open={settingsOpen}
      />
    </Stack>
  );
};
