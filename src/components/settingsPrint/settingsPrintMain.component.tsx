import { Stack, Typography } from "@mui/material";
import {
  InvoiceSettingItem,
  ScrollContainer,
  SecondaryMainLayout,
} from "@myCash/common";
import { Bluetooth, Printer, Wifi } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface SettingsPrintMainProps {
  handleView: (view: "internal" | "wifi" | "bluetooth") => void;
}

export const SettingsPrintMain: React.FC<SettingsPrintMainProps> = ({
  handleView,
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/settings");
  };
  const { t } = useTranslation();
  return (
    <ScrollContainer>
      <SecondaryMainLayout
        title="settings.invoiceSettings"
        handleBack={handleBack}
      >
        <Stack
          gap={"2.5rem"}
          width={"50vw"}
          className="secondary-main-container"
        >
          <Typography variant="h4">{t("settings.printer")}</Typography>
          <Stack gap={"12px"}>
            <InvoiceSettingItem
              icon={<Printer size={16} />}
              name={t("settings.internalPrinter")}
              hasArrow
              onClick={() => handleView("internal")}
            />
            <InvoiceSettingItem
              icon={<Bluetooth size={16} />}
              name="Bluetooth-بلوتوث"
              hasArrow
              onClick={() => handleView("bluetooth")}
            />
            <InvoiceSettingItem
              icon={<Wifi size={16} />}
              name="Wifi-واي فاي"
              hasArrow
              onClick={() => handleView("wifi")}
            />
          </Stack>
        </Stack>
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
