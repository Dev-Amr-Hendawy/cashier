import { useState } from "react";
import { ReceiptEdit } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { InvoiceSettingItem } from "@myCash/common";
import { CommercialNameModal } from "@myCash/components";

interface CommercialNameSettingProps {
  commercialRecordName: string;
  updateHandler: (value: { [key: string]: string }) => void;
}

export const CommercialNameSetting: React.FC<CommercialNameSettingProps> = ({
  commercialRecordName,
  updateHandler,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <InvoiceSettingItem
        icon={<ReceiptEdit size={24} />}
        name={t("settings.commercialRecord")}
        value={commercialRecordName}
        onClick={() => setModalOpen(true)}
        hasArrow
      />
      <CommercialNameModal
        defaultValue={commercialRecordName}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        updateHandler={updateHandler}
      />
    </>
  );
};
