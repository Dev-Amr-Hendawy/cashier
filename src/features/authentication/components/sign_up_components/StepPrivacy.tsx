import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckBox from "../../../../components/form/CheckBox";
import AuthFormLayout from "../AuthFormLayout";
import AuthInfo from "../AuthInfo";
import AuthLayout from "../AuthLayout";
import React from "react";

interface Props {}

const StepPrivacy: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <AuthLayout
      leftComponent={
        <AuthInfo
          title={t("signUp.stepThree.title")}
          description={t("signUp.stepThree.description")}
        />
      }
      rightComponent={<PrivacyContent {...props} />}
    />
  );
};

export default StepPrivacy;

interface PrivacyContentProps {}
const PrivacyContent: React.FC<PrivacyContentProps> = () => {

  const { t } = useTranslation();

  return (
    <AuthFormLayout showLogo={false}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography variant="h2" color="grey.900">
            {t("signUp.stepThree.form.privacyEnd")}
          </Typography>
          <Typography variant="body1" color="grey.800">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            aperiam voluptas iure voluptates error beatae magni dolorem neque
            eaque deserunt aspernatur culpa quasi enim velit, optio quisquam
            molestias, placeat voluptatum. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Maiores aperiam voluptas iure
            voluptates error beatae magni dolorem neque eaque deserunt
            aspernatur culpa quasi enim velit, optio quisquam molestias, placeat
            voluptatum. molestias, placeat voluptatum. Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Maiores aperiam voluptas iure
            voluptates error beatae magni dolorem neque eaque deserunt
            aspernatur culpa quasi enim velit, optio quisquam molestias, placeat
            voluptatum.
          </Typography>
        </Stack>
        <CheckBox
          label={t("signUp.stepThree.form.privacyStart")}
          highlightedText={t("signUp.stepThree.form.privacyEnd")}
        />
      </Stack>
    </AuthFormLayout>
  );
};
