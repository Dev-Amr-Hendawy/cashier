import { Stack } from "@mui/material";
import {
  CommonModal,
  CoupledButton,
  CoupledInput,
  CoupledTextField,
  IconLabelValueField,
} from "@myCash/common";
import { Story } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import saudiFlag from "@myCash/assets/icons/flag.svg";
interface AccountPhoneModalProps {
  open: boolean;
  handleClose: () => void;
  updateHandler: (value: { [key: string]: string }, type: "phone") => void;
  defaultValue: string;
}

export const AccountPhoneModal: React.FC<AccountPhoneModalProps> = ({
  open,
  handleClose,
  updateHandler,
  defaultValue,
}) => {
  const { t } = useTranslation();
  //TODO::fix intial
  const handleSubmit = async (values: { phone: string }) => {
    await updateHandler(values, "phone");
    handleClose();
  };

  return (
    <Formik
      initialValues={{ phone: defaultValue || "" }}
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
          title="accountInfo.setAccountPhone"
          handleConfirm={handleSubmit}
        >
          <Stack className="account-info-modal">
            <IconLabelValueField
              label={t("accountInfo.accountPhoneDesc")}
              icon={<Story color="#232773" size={24} />}
            />
            <CoupledInput
              leftField={
                <CoupledButton
                  title={t("966+")}
                  disabled
                  icon={<img src={saudiFlag} alt="saudi-flag" />}
                />
              }
              rightField={
                <CoupledTextField
                  order="second"
                  name="key"
                  placeholder={t("login.form.phone")}
                  key="phone"
                />
              }
            />
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
