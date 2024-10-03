import { Stack } from "@mui/material";
import { CommonModal, InvoiceSettingItem } from "@myCash/common";
import { t } from "i18next";
import { ArrowCircleDown2, Printer, Setting5, Share } from "iconsax-react";
import { useState } from "react";
import { ReportsFilterModal } from "./reportsFilterModal.component";

interface TaxCardModalProps {
  open: boolean;
  handleClose: () => void;
}

export const TaxCardModal: React.FC<TaxCardModalProps> = ({
  open,
  handleClose,
}) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  return (
    <CommonModal
      hasActions
      open={open}
      title="settings.title"
      handleClose={handleClose}
    >
      <Stack gap={"1rem"}>
        <InvoiceSettingItem
          icon={<Setting5 />}
          id={"filter"}
          name={t("filter.title")}
          onClick={() => setFilterModalOpen(true)}
        />
        <InvoiceSettingItem icon={<Printer />} id={"print"} name={t("print")} />
        <InvoiceSettingItem
          icon={<ArrowCircleDown2 />}
          id={"downloadPdf"}
          name={t("downloadPdf")}
        />
        <InvoiceSettingItem icon={<Share />} id={"share"} name={t("share")} />
      </Stack>
      <ReportsFilterModal
        open={filterModalOpen}
        handleClose={() => setFilterModalOpen(false)}
      />
    </CommonModal>
  );
};
