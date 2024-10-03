import { Stack } from "@mui/material";
import { CommonModal, ModalDescription } from "@myCash/common";
import { Formik } from "formik";
import TextField from "../form/TextField";
import { useTranslation } from "react-i18next";
import { useChangePassword } from "@myCash/hooks";
import { useAuthValidation } from "@myCash/utils";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { changePasswordFormItems } from "@myCash/constants";

interface ChangePasswordModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useChangePassword(handleClose);
  const { forgetPasswordSchema } = useAuthValidation();
  const items = changePasswordFormItems(t);
  return (
    <Formik
      initialValues={{ password: "", cPassword: "" }}
      onSubmit={(data) => mutate(data)}
      validationSchema={toFormikValidationSchema(forgetPasswordSchema)}
    >
      {({ handleSubmit }) => (
        <CommonModal
          open={open}
          handleClose={handleClose}
          hasActions
          title="accountSecurity.changePassword"
          handleConfirm={handleSubmit}
          loading={isPending}
        >
          <Stack gap={"1rem"}>
            <ModalDescription description="accountSecurity.passwordDesc" />
            {items.map((field, index) => (
              <TextField key={index} {...field} />
            ))}
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
