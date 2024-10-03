import { Stack, Typography } from "@mui/material";
import { CommonModal, IconLabelValueField } from "@myCash/common";
import { Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import TextField from "../form/TextField";
import { Formik } from "formik";

interface InvoiceTailModalProps {
  open: boolean;
  handleClose: () => void;
  updateHandler: (
    value: { [key: string]: string },
    type: "settings" | "values"
  ) => void;
  message: string;
  invoiceType: number;
}

export const InvoiceTailModal: React.FC<InvoiceTailModalProps> = ({
  open,
  handleClose,
  updateHandler,
  message,
  invoiceType,
}) => {
  const { t } = useTranslation();
  //TODO::fix intial
  const handleSubmit = async (values: { footerText: string }) => {
    await updateHandler(
      { ...values, type: invoiceType.toLocaleString() },
      "values"
    );
    handleClose();
  };

  return (
    <Formik
      initialValues={{ footerText: message || "" }}
      onSubmit={async (values, methods) => {
        await handleSubmit(values);
        methods.resetForm();
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <CommonModal
          hasActions
          open={open}
          handleClose={handleClose}
          title="settings.invoiceTail"
          handleConfirm={handleSubmit}
        >
          <Stack className="tail-message-modal">
            <IconLabelValueField
              label={t("settings.invoiceTailHeader")}
              icon={<Story color="#232773" size={24} />}
            />
            <Typography variant="h6" color={"#2D2D2D99"}>
              {t("settings.invoiceTailTitle")}
            </Typography>
            <TextField label="" name="footerText" multiline />
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
