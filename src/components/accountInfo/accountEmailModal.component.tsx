import { Stack } from "@mui/material";
import { CommonModal, IconLabelValueField } from "@myCash/common";
import { Sms, Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import TextField from "../form/TextField";
import { Formik } from "formik";

interface AccountEmailModalProps {
  open: boolean;
  handleClose: () => void;
  updateHandler: (value: { [key: string]: string }, type: "email") => void;
  defaultValue: string;
}

export const AccountEmailModal: React.FC<AccountEmailModalProps> = ({
  open,
  handleClose,
  updateHandler,
  defaultValue,
}) => {
  const { t } = useTranslation();
  //TODO::fix intial
  const handleSubmit = async (values: { email: string }) => {
    await updateHandler(values, "email");
    handleClose();
  };

  return (
    <Formik
      initialValues={{ email: defaultValue || "" }}
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
          title="accountInfo.setAccountEmail"
          handleConfirm={handleSubmit}
        >
          <Stack className="account-info-modal">
            <IconLabelValueField
              label={t("accountInfo.accountEmailDesc")}
              icon={<Story color="#232773" size={24} />}
            />
            <TextField label="" name="email" startIcon={<Sms size={24} />} />
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
