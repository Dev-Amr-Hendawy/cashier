import { Stack } from "@mui/material";
import { CommonModal, InvoiceSettingItem } from "@myCash/common";
import { t } from "i18next";
import { ArrowCircleDown2, Printer, Share } from "iconsax-react";

interface ReportsSalesSettingsModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ReportsSalesSettingsModal: React.FC<
  ReportsSalesSettingsModalProps
> = ({ open, handleClose }) => {
  return (
    <CommonModal
      hasActions
      open={open}
      title="settings.title"
      handleClose={handleClose}
    >
      <Stack gap={"1rem"}>
        <InvoiceSettingItem icon={<Printer />} id={"print"} name={t("print")} />
        <InvoiceSettingItem
          icon={<ArrowCircleDown2 />}
          id={"downloadPdf"}
          name={t("downloadPdf")}
        />
        <InvoiceSettingItem icon={<Share />} id={"share"} name={t("share")} />
      </Stack>
    </CommonModal>
  );
};
