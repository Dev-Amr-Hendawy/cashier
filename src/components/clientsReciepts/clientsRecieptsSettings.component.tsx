import { HeaderWithMoreIcon, InvoicesSettingsModal } from "@myCash/common";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ClientsRecieptsSettingsProps {}

export const ClientsRecieptsSettings: React.FC<
  ClientsRecieptsSettingsProps
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
        title={t("client.recieptTitle")}
        onClick={handleOpen}
      />
      <InvoicesSettingsModal
        open={open}
        handleClose={handleClose}
        handlePrint={() => {}}
      />
    </>
  );
};
