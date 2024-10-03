import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../../../components/ui/BackButton";
import Fading from "../../../../components/ui/animation/Fading";
import Button from "../../../../components/form/Button";
import LockIcon from "../../../../components/ui/icons/LockIcon";
import EyeIcon from "../../../../components/ui/icons/EyeIcon";
import TextField from "../../../../components/form/TextField";
import { Form, Formik } from "formik";
import { useResetPassword } from "../../../../hooks/auth-hooks";
import { useAuthValidation } from "@myCash/utils/validation/auth";
import { toFormikValidationSchema } from "zod-formik-adapter";

const StepThree = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type");

  const fields = [
    {
      name: "password",
      type: "password",
      label: t("login.form.password"),
      startIcon: <LockIcon />,
      endIcon: <EyeIcon />,
    },
    {
      name: "rePassword",
      type: "password",
      label: t("login.form.password"),
      startIcon: <LockIcon />,
      endIcon: <EyeIcon />,
    },
  ];

  const initialValues = {
    password: "",
    rePassword: "",
  };

  const { mutate, isPending } = useResetPassword();
  const { forgetPasswordSchema } = useAuthValidation();

  return (
    <Fading>
      <BackButton
        onClick={() => {
          setSearchParams({ type: "2", step: "2" });
        }}
      />

      <Stack spacing={4}>
        <Stack spacing={3}>
          <Typography variant="h2" color="grey.900">
            {type === "1" ? t("signUp.stepFive.title") : t("signUp.stepFive.titleEmail")}
          </Typography>
          <Typography variant="subtitle1" color="grey.800">
            {type === "1" ? t("signUp.stepFive.desc") : t("signUp.stepFive.descEmail")}
          </Typography>
        </Stack>
        <Formik
          initialValues={initialValues}
          onSubmit={(data) => mutate(data)}
          validationSchema={toFormikValidationSchema(forgetPasswordSchema)}
        >
          {() => (
            <Form>
              <Stack spacing={2}>
                {fields.map((field, index) => (
                  <TextField key={index} {...field} />
                ))}
                <Button type="submit" loading={isPending} text={t("signUp.stepTwo.continue")} />
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Fading>
  );
};

export default StepThree;
