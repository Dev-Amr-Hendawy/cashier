import { useTranslation } from "react-i18next";
import { CommonModal, InvoiceSettingItem } from "..";
import { Stack } from "@mui/material";
import { ArrowCircleDown2, Printer, ScanBarcode, Share } from "iconsax-react";

type InvoicesSettingsModalProps = {
  open: boolean;
  handleClose: () => void;
  handlePrint: () => void;
};

export const InvoicesSettingsModal: React.FC<InvoicesSettingsModalProps> = ({
  open,
  handleClose,
  handlePrint,
}) => {
  const { t } = useTranslation();
  const invoicesItems = [
    {
      name: t("print"),
      icon: <Printer />,
      id: "print",
      onClick: handlePrint,
    },
    {
      name: t("downloadPdf"),
      icon: <ArrowCircleDown2 />,
      id: "pdf",
    },
    {
      name: t("qrCode"),
      icon: <ScanBarcode />,
      id: "qrCode",
    },
    {
      name: t("share"),
      icon: <Share />,
      id: "share",
    },
  ];
  return (
    <>
      <CommonModal
        open={open}
        hasActions={false}
        title={t("settings.title")}
        handleConfirm={handleClose}
        handleCancel={handleClose}
        handleBackBtn={handleClose}
        handleClose={handleClose}
      >
        <Stack gap={"12px"}>
          {invoicesItems.map((item) => (
            <InvoiceSettingItem key={item.id} {...item} hasArrow={false} />
          ))}
        </Stack>
      </CommonModal>
    </>
  );
};
