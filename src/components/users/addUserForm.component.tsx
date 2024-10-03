import { Form, Formik } from "formik";
import {
  ActionsContainer,
  CommonModal,
  PhoneCoupledTextfield,
  SelectInput,
} from "@myCash/common";
import { useTranslation } from "react-i18next";
import { userFormFields } from "@myCash/constants";
import TextField from "../form/TextField";
import { EyeSlash, MedalStar } from "iconsax-react";
import Button from "../form/Button";
import "./styles.scss";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useUserValidation } from "@myCash/utils";
interface AddUserFormProps {
  open: boolean;
  handleClose: () => void;
  buttonNames: { action: string };
  submitHandler: (values: { [key: string]: string }) => void;
  isPending?: boolean;
  isSuccess: boolean;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({
  open,
  handleClose,
  buttonNames,
  submitHandler,
  isPending,
}) => {
  const { t } = useTranslation();
  const { addUserSchema } = useUserValidation();
  // TODO:: error with BE
  return (
    <Formik
      initialValues={{
        name: "",
        role: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        notes: "",
        type: "",
      }}
      onSubmit={(values) => {
        submitHandler(values);
      }}
      validationSchema={toFormikValidationSchema(addUserSchema)}
    >
      {({ handleSubmit, handleReset }) => (
        <Form style={{ width: "100%" }} className="user-form-container">
          <CommonModal
            open={open}
            buttonsNames={buttonNames}
            hasActions={false}
            title={t("users.addUser")}
            handleConfirm={async () => {
              await handleSubmit();
            }}
            handleClose={() => {
              handleReset();
              // { values: initialValues }
              handleClose();
            }}
            loading={isPending}
          >
            {userFormFields(t).map((field) => {
              if (field.name === "phone") {
                return <PhoneCoupledTextfield key={field.name} />;
              }
              if (field.name === "type") {
                return (
                  <SelectInput
                    key={field.name}
                    options={[
                      { label: t("users.form.admin"), value: "1" },
                      { label: t("users.form.cashier"), value: "2" },
                    ]}
                    startIcon={<MedalStar color="#2D2D2D" size={24} />}
                    {...field}
                    placeholder="users.form.role"
                  />
                );
              }
              if (field.name === "password") {
                return (
                  <TextField
                    key={field.name}
                    type="password"
                    endIcon={<EyeSlash />}
                    {...field}
                  />
                );
              }
              return <TextField key={field.name} {...field} />;
            })}
            <ActionsContainer spacing={2} direction="row">
              <Button
                text={t("add")}
                variant="contained"
                color="primary"
                loading={isPending}
                onClick={() => {
                  handleSubmit();
                }}
              />
              <Button
                text={t("cancel")}
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleReset();
                  handleClose();
                }}
              />
            </ActionsContainer>
          </CommonModal>
        </Form>
      )}
    </Formik>
  );
};
