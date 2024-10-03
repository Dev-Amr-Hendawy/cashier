import { useState } from "react";
import {
  InternalPrintSettings,
  SettingsPrintMain,
  BluetoothPrintSettings,
  WifiPrintSettings,
} from "@myCash/components";

interface SettingsPrintContentProps {}

export const SettingsPrintContent: React.FC<SettingsPrintContentProps> = () => {
  const [printPage, setPrintPage] = useState<
    "main" | "internal" | "wifi" | "bluetooth"
  >("main");
  return (
    <>
      {printPage === "main" && (
        <SettingsPrintMain handleView={(view) => setPrintPage(view)} />
      )}
      {printPage === "internal" && (
        <InternalPrintSettings handleView={(view) => setPrintPage(view)} />
      )}
      {printPage === "bluetooth" && (
        <BluetoothPrintSettings handleView={(view) => setPrintPage(view)} />
      )}
      {printPage === "wifi" && (
        <WifiPrintSettings handleView={(view) => setPrintPage(view)} />
      )}
    </>
  );
};
