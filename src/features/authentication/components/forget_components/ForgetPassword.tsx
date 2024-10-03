import { useTranslation } from "react-i18next";
import AuthInfo from "../AuthInfo";
import AuthLayout from "../AuthLayout";
import ForgetPasswordForm from "./ForgetPasswordForm";
import AuthFormLayout from "../AuthFormLayout";
import { useSearchParams } from "react-router-dom";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  return (
    <AuthLayout
      leftComponent={
        <AuthInfo
          title={t("forgetPassword.title")}
          description={t("forgetPassword.description")}
        />
      }
      rightComponent={
        <AuthFormLayout showLogo={searchParams.get("step") === "1"}>
          <ForgetPasswordForm />
        </AuthFormLayout>
      }
    />
  );
};

export default ForgetPassword;
