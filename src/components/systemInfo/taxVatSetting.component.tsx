import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReceiptDiscount } from "iconsax-react";
import { InvoiceSettingItem } from "@myCash/common";
import { TaxVatModal } from "@myCash/components";

interface TaxVatSettingProps {
  taxVat: string;
  updateHandler: (value: { [key: string]: string }) => void;
}

export const TaxVatSetting: React.FC<TaxVatSettingProps> = ({
  taxVat,
  updateHandler,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <InvoiceSettingItem
        icon={<ReceiptDiscount size={24} />}
        name={t("systemInfo.taxVatTitle")}
        value={`${taxVat?taxVat : ""} %`}
        onClick={() => setModalOpen(true)}
        hasArrow
      />
      <TaxVatModal
        defaultValue={taxVat}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        updateHandler={updateHandler}
      />
    </>
  );
};
