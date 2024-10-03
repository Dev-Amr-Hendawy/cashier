import { Typography } from "@mui/material";
import { InvoiceSettingItem } from "@myCash/common";
import { ArchiveBook } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InvoiceTailModal } from "@myCash/components";

interface InvoiceTailSettingProps {
  message: string;
  updateHandler: (
    value: { [key: string]: string },
    type: "settings" | "values"
  ) => void;
  invoiceType: number;
}

export const InvoiceTailSetting: React.FC<InvoiceTailSettingProps> = ({
  updateHandler,
  message,
  invoiceType,
}) => {
  const { t } = useTranslation();
  const [tailOpen, setTailOpen] = useState(false);
  return (
    <>
      <Typography variant="h4">{t("settings.invoiceTail")}</Typography>
      <InvoiceSettingItem
        icon={<ArchiveBook size={24} />}
        hasArrow
        name={t("settings.msg")}
        onClick={() => setTailOpen(true)}
        value={message}
      />
      <InvoiceTailModal
        open={tailOpen}
        handleClose={() => setTailOpen(false)}
        updateHandler={updateHandler}
        message={message}
        invoiceType={invoiceType}
      />
    </>
  );
};
