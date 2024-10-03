import StepperCustom from "@myCash/components/ui/StepperCustom";
import { RootState } from "@myCash/lib";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const StepperSignUp = () => {
  const { t } = useTranslation();
  const freeTrial = useSelector((state: RootState) => state.user.freeTrial);
  const { step } = useSelector(
    (state: { formStep: { step: number } }) => state.formStep
  );
  const steps = [
    t("accountInfo.title"),
    t("signUp.steps.verifyMobile"),
    t("signUp.steps.subscriptionPackages"),
    t("signUp.steps.devices"),
    t("signUp.steps.billingPayment"),
  ]; const stepsFreeTrial = [
    t("accountInfo.title"),
    t("signUp.steps.verifyMobile"),
   
  ];
  return <StepperCustom steps={freeTrial?stepsFreeTrial:steps} activeStep={step-1} />;
};

export default StepperSignUp;
