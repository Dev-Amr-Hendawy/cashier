import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { dateFormatHandler } from "@myCash/utils";
import { expenseFormItems } from "@myCash/constants";
import { ActionsContainer, CommonModal, FileInput } from "@myCash/common";
import Button from "../form/Button";
import TextField from "../form/TextField";
import DatePicker from "../form/DatePicker";

interface AddExpenseFormProps {
  open: boolean;
  handleClose: () => void;
  buttonNames: { action: string };
  submitHandler: (values: { [key: string]: string }) => void;
  isPending?: boolean;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  open,
  handleClose,
  buttonNames,
  submitHandler,
  isPending,
}) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        statement: "",
        amount: "0",
        date: "",
        additional_info: "",
        note: "",
        file: "",
      }}
      onSubmit={submitHandler}
    >
      {({ handleSubmit, handleReset, setFieldValue }) => (
        <Form style={{ width: "100%" }}>
          <CommonModal
            open={open}
            buttonsNames={buttonNames}
            hasActions={false}
            title={t("expenses.addExpense")}
            handleConfirm={handleSubmit}
            handleClose={handleClose}
          >
            {expenseFormItems(t).map((field) => {
              if (field.name === "file") {
                return (
                  <FileInput
                    key={field.name}
                    {...field}
                    label={field.label}
                    labelIcon={field.startIcon}
                  />
                );
              }
              if (field.name === "date") {
                return (
                  <DatePicker
                    key={field.name}
                    {...field}
                    fullWidth
                    placeholder={t("expenses.form.date")}
                    onChange={(data) =>
                      setFieldValue(
                        "date",
                        dateFormatHandler(data).toLocaleString()
                      )
                    }
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
