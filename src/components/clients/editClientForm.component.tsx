import { Stack } from "@mui/material";
import { People, Profile2User } from "iconsax-react";
import { useTranslation } from "react-i18next";
// import { SearchClientContent } from "..";
import { ClientType, CommonModal, PhoneCoupledTextfield } from "@myCash/common";
import { ActionsContainer } from "../../common/modal/styles";
import Button from "../form/Button";
import TextField from "../form/TextField";
import { clientFields } from "@myCash/constants";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { useUpdateClient } from "@myCash/hooks";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useClientValidation } from "@myCash/utils";

interface EditClientFormProps {
  handleClose: () => void;
  open: boolean;
}

export const EditClientForm: React.FC<EditClientFormProps> = ({
  handleClose,
  open,
}) => {
  const { t } = useTranslation();
  const clientState = useSelector((state: RootState) => state.client);
  const { mutate } = useUpdateClient();
  const submitHandler = (values: Record<string, string>) => {
    mutate(values);
    handleClose();
  };
  const { editClientSchema } = useClientValidation();
  return (
    <Formik
      initialValues={{
        client_id: clientState.client_id || "",
        name: clientState.name || "",
        phone: clientState.phone || "",
        email: clientState.email || "",
        taxRecord: clientState.taxRecord || "",
        commercialRecord: clientState.commercialRecord || "",
        address: clientState.address || "",
        notes: clientState.notes || "",
        country_id: "1",
      }}
      onSubmit={submitHandler}
      validationSchema={toFormikValidationSchema(editClientSchema)}
    >
      {({ isSubmitting, handleSubmit, handleReset }) => (
        <CommonModal
          open={open}
          handleClose={handleClose}
          title="client.editForm"
          hasActions={false}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1}>
              <ClientType
                name="type"
                id={1}
                text={t("client.form.clients")}
                icon={<Profile2User variant="TwoTone" />}
              />
              <ClientType
                name="type"
                id={2}
                text={t("client.form.suppliers")}
                icon={<People />}
              />
            </Stack>
            {clientFields(t).map((field) => {
              if (field.name === "phone") {
                return <PhoneCoupledTextfield key={"field.name"} />;
              } else {
                return <TextField key={field.name} {...field} />;
              }
            })}
            <ActionsContainer spacing={2} direction="row">
              <Button
                text={t("continue")}
                variant="contained"
                color="primary"
                loading={isSubmitting}
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
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
