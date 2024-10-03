import { useLocation } from "react-router-dom";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const ForgetPasswordForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  if (searchParams.get("step") === "2") return <StepTwo />;
  if (searchParams.get("step") === "3") return <StepThree />;
  return <StepOne />;
};

export default ForgetPasswordForm;
