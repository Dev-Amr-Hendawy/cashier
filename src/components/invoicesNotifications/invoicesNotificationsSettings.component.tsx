import { HeaderWithMoreIcon, InvoicesSettingsModal } from "@myCash/common";

import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ClientsInvoicesSettingsProps {}

export const InvoicesNotificationsSettings: React.FC<
  ClientsInvoicesSettingsProps
> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <HeaderWithMoreIcon
        title={t("invoice.details")}
        onClick={handleOpen}
        hideMore
      />
      <InvoicesSettingsModal
        open={open}
        handleClose={handleClose}
        handlePrint={() => {}}
      />
    </>
  );
};
