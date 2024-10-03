import { FormikErrors, FormikTouched } from "formik";

import AuthInfo from "../AuthInfo";
import { SignUpData } from "../../../../apis";
import SignUpStepForm from "./SignUpStepForm";
import { useTranslation } from "react-i18next";
import AuthStepsLayout from "./AuthStepsLayout";

interface Props {
  errors: FormikErrors<SignUpData>;
  touched: FormikTouched<SignUpData>;
  isPending?: boolean;
}

const SignUpFieldsStep: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  return (
    <AuthStepsLayout
    rightComponent={
      <AuthInfo
      title={t("signUp.stepThree.title")}
      description={t("signUp.stepThree.description")}
    />
    }
      component={<SignUpStepForm {...props} isPending={props.isPending} />}
    />
  );
};

export default SignUpFieldsStep;
