import { Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../../components/form/Button";
import BackButton from "../../../../components/ui/BackButton";
import Fading from "../../../../components/ui/animation/Fading";
import ForgetAccordion from "./ForgetAccordion";
import { ForgetPasswordValuesType } from "../../../../apis";
import { useForgetPassword } from "../../../../hooks/auth-hooks";

const StepOne = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialValues: ForgetPasswordValuesType = {
    key: "",
    type: searchParams.get("type") || "2", // 1 for phone, 2 for email
    country_id: "1",
  };

  const { mutate, isPending } = useForgetPassword();
  return (
    <Fading>
      <Formik initialValues={initialValues} onSubmit={mutate}>
        {() => (
          <Form>
            <Stack spacing={3}>
              <BackButton
                onClick={() => {
                  navigate("/login");
                }}
              />
              <Typography color="grey.800" variant="body1">
                {t("forgetPassword.stepOne.title")}
              </Typography>
              <Stack spacing={1.5}>
                <ForgetAccordion />
              </Stack>
              <Button
                text={t("signUp.stepTwo.continue")}
                type="submit"
                loading={isPending}
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </Fading>
  );
};

export default StepOne;
