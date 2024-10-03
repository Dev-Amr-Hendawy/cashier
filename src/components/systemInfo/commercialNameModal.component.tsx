import { Stack } from "@mui/material";
import { CommonModal, IconLabelValueField } from "@myCash/common";
import { Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import TextField from "../form/TextField";
import { Formik } from "formik";

interface CommercialNameModalProps {
  open: boolean;
  handleClose: () => void;
  updateHandler: (value: { [key: string]: string }) => void;
  defaultValue: string;
}

export const CommercialNameModal: React.FC<CommercialNameModalProps> = ({
  open,
  handleClose,
  updateHandler,
  defaultValue,
}) => {
  const { t } = useTranslation();
  //TODO::fix intial
  const handleSubmit = (values: { commercialRecordName: string }) => {
    updateHandler(values);
    handleClose();
  };
  return (
    <Formik
      initialValues={{ commercialRecordName: defaultValue || "" }}
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
              label={t("systemInfo.commercialRecord")}
              icon={<Story color="#232773" size={24} />}
            />
            <TextField label="" name="commercialRecordName" />
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
