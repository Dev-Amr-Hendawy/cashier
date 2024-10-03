import { HeaderWithMoreIcon } from "@myCash/common";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClientsSettingsModal } from "@myCash/components";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

interface ClientsSettingsProps {}

export const ClientsSettings: React.FC<ClientsSettingsProps> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const clientState = useSelector((state: RootState) => state.client);
  useEffect(() => {
    if (!clientState.client_id) {
      setOpen(false);
    }
  }, [clientState.client_id]);
  return (
    <>
      <HeaderWithMoreIcon
        title={t("client.clientDetails")}
        onClick={handleOpen}
        hideMore={!clientState.client_id}
      />
      <ClientsSettingsModal open={open} handleClose={handleClose} />
    </>
  );
};
