import { Form, Formik } from "formik";
import { EyeSlash, MedalStar } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { userFormFields } from "@myCash/constants";
import {
  ActionsContainer,
  CommonModal,
  PhoneCoupledTextfield,
  SelectInput,
} from "@myCash/common";
import Button from "../form/Button";
import TextField from "../form/TextField";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useUserValidation } from "@myCash/utils";

interface EditUserFormProps {
  open: boolean;
  handleClose: () => void;
  submitHandler: (values: { [key: string]: string }) => void;
  isPending?: boolean;
}

export const EditUserForm: React.FC<EditUserFormProps> = ({
  open,
  handleClose,
  submitHandler,
  isPending,
}) => {
  const { t } = useTranslation();
  const employee = useSelector((state: RootState) => state.employee);
  const { editUserSchema } = useUserValidation();
  return (
    <Formik
      initialValues={{
        employee_id: employee.id || "",
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        address: employee.address || "",
        password: "",
        notes: "",
        type: employee.type || "",
      }}
      onSubmit={(values) => {
        submitHandler(values);
        handleClose();
      }}
      validationSchema={toFormikValidationSchema(editUserSchema)}
    >
      {({ handleSubmit, handleReset }) => (
        <Form style={{ width: "100%" }}>
          <CommonModal
            open={open}
            hasActions={false}
            title={t("users.editForm")}
            handleConfirm={handleSubmit}
            handleClose={handleClose}
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
                text={t("continue")}
                variant="contained"
                color="primary"
                loading={isPending}
                onClick={handleSubmit}
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
