import { Stack, Typography } from "@mui/material";
import {
  InvoiceSettingItem,
  ScrollContainer,
  SecondaryMainLayout,
  SettingSwitchItem,
} from "@myCash/common";
import { DocumentText, Layer, Monitor, ReceiveSquare2 } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface InternalPrintSettingsProps {
  handleView: (view: "main") => void;
}

export const InternalPrintSettings: React.FC<InternalPrintSettingsProps> = ({
  handleView,
}) => {
  const { t } = useTranslation();
  return (
    <ScrollContainer>
      <SecondaryMainLayout
        title="settings.internalPrinter"
        handleBack={() => handleView("main")}
      >
        <Stack
          gap={"2.5rem"}
          width={"50vw"}
          className="secondary-main-container"
        >
          <Typography variant="h4">
            {`${t("settings.title")} ${t("settings.printer")}`}
          </Typography>
          <Stack gap={"12px"}>
            <InvoiceSettingItem
              icon={<Monitor size={24} />}
              name={t("settings.deviceType")}
              hasArrow
              value="HP LaserJet Pro MFP M130nw"
            />
            <InvoiceSettingItem
              icon={<DocumentText size={24} />}
              name={t("settings.paperSize")}
              hasArrow
              value="HP LaserJet Pro MFP M130nw"
            />
            <InvoiceSettingItem
              icon={<ReceiveSquare2 size={24} />}
              name={t("settings.paperFont")}
              hasArrow
              value="HP LaserJet Pro MFP M130nw"
            />
            <InvoiceSettingItem
              icon={<Layer size={24} />}
              name={t("settings.paperCopies")}
              hasArrow
              value="HP LaserJet Pro MFP M130nw"
            />
            <SettingSwitchItem
              icon={<ReceiveSquare2 size={24} />}
              name={t("settings.paperFont")}
              status={1}
            />
          </Stack>
        </Stack>
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
