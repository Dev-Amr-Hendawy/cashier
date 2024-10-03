import { Stack } from "@mui/material";
import { BackDrop, CommonModal, IconLabelValueField } from "@myCash/common";
import { SecurityUser, Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import TextField from "../form/TextField";
import { Formik } from "formik";

interface AccountNameModalProps {
  open: boolean;
  handleClose: () => void;
  updateHandler: (value: { [key: string]: string }) => void;
  defaultValue: string;
  profilePending: boolean;
}

export const AccountNameModal: React.FC<AccountNameModalProps> = ({
  open,
  handleClose,
  updateHandler,
  defaultValue,
  profilePending,
}) => {
  const { t } = useTranslation();
  const handleSubmit = async (values: { name: string }) => {
    await updateHandler(values);
    handleClose();
  };

  return (
    <Formik
      initialValues={{ name: defaultValue || "" }}
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
          title="accountInfo.setAccountName"
          handleConfirm={handleSubmit}
        >
          <BackDrop open={profilePending || false} />

          <Stack className="account-info-modal">
            <IconLabelValueField
              label={t("accountInfo.accountNameDesc")}
              icon={<Story color="#232773" size={24} />}
            />
            <TextField
              label=""
              name="name"
              startIcon={<SecurityUser size={24} />}
            />
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
