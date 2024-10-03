import {
  InvoicesReturnModalDetails,
} from "@myCash/common";
import Button from "@myCash/components/form/Button";
import { InvoiceType } from "@myCash/types";
import { MoneyChange } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ActionToReturnInvoiceDetailsProps {
  invoice:InvoiceType;
}

export const ActionToReturnInvoiceDetails: React.FC<ActionToReturnInvoiceDetailsProps> = ({

  invoice,

}) => {
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
      <Button
        text={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              color: "#FFF",
              gap: "12px",
            }}
          >
            <MoneyChange size="24" color="#FFF" /> {t("invoice.returnInvoice")}
          </div>
        }
        color="primary"
        onClick={handleOpen}
      />

      <InvoicesReturnModalDetails
        open={open}
        handleClose={handleClose}
        invoice={invoice}
        // handlePrint={handlePrint}
      />
    </>
  );
};
