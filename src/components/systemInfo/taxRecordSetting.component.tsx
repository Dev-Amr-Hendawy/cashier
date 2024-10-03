import { useState } from "react";
import { ShieldSecurity } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { InvoiceSettingItem } from "@myCash/common";
import { TaxRecordModal } from "@myCash/components";

interface TaxRecordSettingProps {
  taxRecord: string;
  updateHandler: (value: { [key: string]: string }) => void;
}

export const TaxRecordSetting: React.FC<TaxRecordSettingProps> = ({
  taxRecord,
  updateHandler,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <InvoiceSettingItem
        icon={<ShieldSecurity size={24} />}
        name={t("settings.taxRecord")}
        value={taxRecord}
        onClick={() => setModalOpen(true)}
        hasArrow
      />
      <TaxRecordModal
        defaultValue={taxRecord}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        updateHandler={updateHandler}
      />
    </>
  );
};
