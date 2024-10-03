import { useState } from "react";
import { ReceiptEdit } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { InvoiceSettingItem } from "@myCash/common";
import { CommercialRecordModal } from "@myCash/components";

interface CommercialRecordSettingProps {
  commercialRecord: string;
  updateHandler: (value: { [key: string]: string }) => void;
}

export const CommercialRecordSetting: React.FC<
  CommercialRecordSettingProps
> = ({ commercialRecord, updateHandler }) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <InvoiceSettingItem
        icon={<ReceiptEdit size={24} />}
        name={t("settings.commercialRecordNumber")}
        value={commercialRecord}
        onClick={() => setModalOpen(true)}
        hasArrow
      />
      <CommercialRecordModal
        defaultValue={commercialRecord}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        updateHandler={updateHandler}
      />
    </>
  );
};
