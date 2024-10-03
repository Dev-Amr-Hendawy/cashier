import { HeaderWithMoreIcon } from "@myCash/common";
import { useState } from "react";
import { t } from "i18next";
import { Stack } from "@mui/material";
import { ReportsInventorySettingsModal } from "@myCash/components";
// import { ReportsInventorySettingsModal } from "./reportsInventorySettingsModal.component";

interface ReportsInventorySettingsProps {}

export const ReportsInventorySettings: React.FC<
  ReportsInventorySettingsProps
> = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <Stack className="reports-sales-settings">
      <HeaderWithMoreIcon
        title={t("reports.title")}
        onClick={() => setSettingsOpen(true)}
      />
      <ReportsInventorySettingsModal
        handleClose={() => setSettingsOpen(false)}
        open={settingsOpen}
      />
    </Stack>
  );
};
