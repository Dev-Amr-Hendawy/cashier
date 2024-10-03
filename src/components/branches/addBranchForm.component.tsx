import { Form, Formik } from "formik";
import {
  ActionsContainer,
  CommonModal,
  PhoneCoupledTextfield,
  SelectInput,
} from "@myCash/common";
import { useTranslation } from "react-i18next";
import { branchFormItems } from "@myCash/constants";
import TextField from "../form/TextField";
import { EyeSlash, Medal } from "iconsax-react";
import Button from "../form/Button";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAddBranchValidation } from "@myCash/utils/validation/branch.validation";

interface AddBranchFormProps {
  open: boolean;
  handleClose: () => void;
  buttonNames: { action: string };
  submitHandler: (values: { [key: string]: string }) => void;
  isPending?: boolean;
}

export const AddBranchForm: React.FC<AddBranchFormProps> = ({
  open,
  handleClose,
  buttonNames,
  submitHandler,
  isPending,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const { branchValidation } = useAddBranchValidation();
  return (
    <Formik
      initialValues={{
        name: "",
        isMain: "0",
        employee_id: user?.user?.id.toLocaleString() || "",
        phone: "",
        address: "",
        notes: "",
        status: "2",
        city: "",
      }}
      onSubmit={async (v) => {
        await submitHandler(v);
        // !isPending && handleClose();
      }}
      validationSchema={toFormikValidationSchema(branchValidation)}
    >
      {({ handleSubmit, handleReset }) => (
        <Form style={{ width: "100%" }}>
          <CommonModal
            open={open}
            buttonsNames={buttonNames}
            hasActions={false}
            title={t("branches.addBranch")}
            handleConfirm={handleSubmit}
            handleClose={handleClose}
            loading={isPending}
          >
            {branchFormItems(t).map((field) => {
              if (field.name === "phone") {
                return (
                  <PhoneCoupledTextfield
                    key={field.name}
                    disableNotchedOutline
                  />
                );
              }
              if (field.name === "status") {
                return (
                  <SelectInput
                    key={field.name}
                    name={field.name}
                    placeholder="status"
                    startIcon={<Medal size={24} />}
                    options={[
                      { value: "1", label: t("active") },
                      { value: "2", label: t("inactive") },
                    ]}
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
                onClick={() => handleSubmit()}
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
