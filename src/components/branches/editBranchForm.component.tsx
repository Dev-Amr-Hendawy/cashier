import { Form, Formik } from "formik";
import {
  ActionsContainer,
  CommonModal,
  PhoneCoupledTextfield,
  SelectInput,
} from "@myCash/common";
import { useTranslation } from "react-i18next";
import { branchFormItems } from "@myCash/constants";
// import { SearchClientContent } from "..";
import TextField from "../form/TextField";
import { EyeSlash, Medal } from "iconsax-react";
import Button from "../form/Button";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

interface EditBranchFormProps {
  open: boolean;
  handleClose: () => void;
  submitHandler: (values: { [key: string]: string }) => void;
  isPending?: boolean;
}

export const EditBranchForm: React.FC<EditBranchFormProps> = ({
  open,
  handleClose,
  submitHandler,
  isPending,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const branch = useSelector((state: RootState) => state.branch);
  return (
    <Formik
      initialValues={{
        name: branch.name || "",
        // isMain: "0",
        employee_id: user?.user?.id.toLocaleString() || "",
        phone: branch.phone || "",
        address: branch.address || "",
        notes: "",
        status: branch.status ? branch.status.toLocaleString() : "",
        city: "",
        branch_id: branch.id
          ? (branch?.id as number | string)?.toLocaleString()
          : "",
      }}
      onSubmit={(v) => {
        submitHandler(v);
        handleClose();
      }}
    >
      {({ handleSubmit, handleReset }) => (
        <Form style={{ width: "100%" }}>
          <CommonModal
            open={open}
            hasActions={false}
            title={t("branches.editBranch")}
            handleConfirm={handleSubmit}
            handleClose={handleClose}
          >
            {branchFormItems(t).map((field) => {
              if (field.name === "phone") {
                return <PhoneCoupledTextfield key={field.name} />;
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
