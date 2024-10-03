import { Stack } from "@mui/material";
import { CommonModal, IconLabelValueField } from "@myCash/common";
import { Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import TextField from "../form/TextField";
import { Formik } from "formik";

interface TaxRecordModalProps {
  open: boolean;
  handleClose: () => void;
  updateHandler: (value: { [key: string]: string }) => void;
  defaultValue: string;
}

export const TaxRecordModal: React.FC<TaxRecordModalProps> = ({
  open,
  handleClose,
  updateHandler,
  defaultValue,
}) => {
  const { t } = useTranslation();
  const handleSubmit = async (values: { taxRecord: string }) => {
    await updateHandler(values);
    handleClose();
  };
  return (
    <Formik
      initialValues={{ taxRecord: defaultValue || "" }}
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
              label={t("systemInfo.taxRecord")}
              icon={<Story color="#232773" size={24} />}
            />
            <TextField label="" name="taxRecord" />
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
