import { Stack } from "@mui/material";
import { BackDrop, ScrollContainer, SecondaryMainLayout } from "@myCash/common";
import {
  InvoiceQrSettings,
  InvoiceSettingsOthers,
  InvoiceSystemSettings,
  InvoiceTailSetting,
  InvoiceType,
} from "@myCash/components";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import {
  useUpdateInvoiceSettings,
  useUpdateInvoiceSettingsValues,
} from "@myCash/hooks";
import { ISettings } from "@myCash/types";
import { INVOICE_TYPE } from "@myCash/constants";

interface InvoiceSettingsContentProps {
  isPending: boolean;
  data: ISettings;
}

export const InvoiceSettingsContent: React.FC<InvoiceSettingsContentProps> = ({
  data,
  isPending,
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/settings");
  };
  const { mutate } = useUpdateInvoiceSettings();
  const { mutate: mutateSettingsValues } = useUpdateInvoiceSettingsValues();
  const updateHandler = (
    value: { [key: string]: string },
    type: "settings" | "values"
  ) => {
    if (type === "settings") mutate(value);
    else mutateSettingsValues(value);
  };

  return (
    <ScrollContainer>
      <SecondaryMainLayout
        title="settings.invoiceSettings"
        handleBack={handleBack}
      >
        <BackDrop open={isPending} />
        <Stack
          gap={"2.5rem"}
          width={"50vw"}
          className="secondary-main-container"
        >
          {/* system settings */}
          <InvoiceSystemSettings handleSwitch={updateHandler} settings={data} />
          {/* invoice Type */}
          <InvoiceType
            invoiceType={data.active}
            updateHandler={updateHandler}
          />
          {/* Invoice tail message */}
          <InvoiceTailSetting
            updateHandler={updateHandler}
            message={
              data?.active === INVOICE_TYPE.SIMPLE
                ? data?.simpleInvoice?.footerText
                : data?.taxInvoice?.footerText
            }
            invoiceType={data.active}
          />
          {/* others */}
          <InvoiceSettingsOthers
            simpleInvoice={data?.simpleInvoice}
            taxInvoice={data?.taxInvoice}
            invoiceType={data.active}
            handleSwitch={updateHandler}
          />
          {/* invoice qr */}
          <InvoiceQrSettings
            simpleInvoice={data?.simpleInvoice}
            taxInvoice={data?.taxInvoice}
            invoiceType={data.active}
            handleSwitch={updateHandler}
          />
        </Stack>
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
