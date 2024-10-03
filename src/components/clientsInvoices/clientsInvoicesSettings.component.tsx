import {  HeaderWithMoreIconWithOutTitle, InvoicesSettingsModal } from "@myCash/common";

import { useState } from "react";

interface ClientsInvoicesSettingsProps {
  handlePrint: () => void;
  invoiceId: string;
}

export const ClientsInvoicesSettings: React.FC<
  ClientsInvoicesSettingsProps
> = ({ handlePrint, invoiceId }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <HeaderWithMoreIconWithOutTitle
        onClick={handleOpen}
        hideMore={!invoiceId}
      />
      <InvoicesSettingsModal
        open={open}
        handleClose={handleClose}
        handlePrint={handlePrint}
      />
    </>
  );
};
