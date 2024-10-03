import { Stack } from "@mui/material";
import { CommonModal, IconLabelValueField } from "@myCash/common";
import { Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import TextField from "../form/TextField";
import { Formik } from "formik";

interface TaxVatModalProps {
  open: boolean;
  handleClose: () => void;
  updateHandler: (value: { [key: string]: string }) => void;
  defaultValue: string;
}

export const TaxVatModal: React.FC<TaxVatModalProps> = ({
  open,
  handleClose,
  updateHandler,
  defaultValue,
}) => {
  const { t } = useTranslation();
  const handleSubmit = async (values: { tax: string }) => {
    await updateHandler(values);
    handleClose();
  };
  return (
    <Formik
      initialValues={{ tax: defaultValue || "" }}
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
              label={t("systemInfo.taxVat")}
              icon={<Story color="#232773" size={24} />}
            />
            <TextField label="" name="tax" />
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
