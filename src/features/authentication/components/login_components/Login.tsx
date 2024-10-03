import { useTranslation } from "react-i18next";
import AuthInfo from "../AuthInfo";
import LoginForm from "./LoginForm";
import { AuthLayout } from "../..";


const Login = () => {
  const { t } = useTranslation();

 

  return (
    <AuthLayout
      leftComponent={
        <AuthInfo
          title={t("login.title")}
          description={t("login.description")}
        />
      }
      rightComponent={<LoginForm />}
    />
  );
};

export default Login;
