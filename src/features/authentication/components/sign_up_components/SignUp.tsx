import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useSignUp } from "../../../../hooks/auth-hooks";

import DevicesStep from "./DevicesStep";
import OtpStep from "./OtpStep";
import PlansStep from "./PlansStep";
import React, { useEffect } from "react";
import { RegisterPayment } from ".";
import {
  changeStep,
  RootState,
  setSubscriptionDevice,
  setSubscriptionPackage,
} from "@myCash/lib";
import { SignUpData } from "../../../../apis";
import SignUpFieldsStep from "./SignUpFieldsStep";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAuthValidation } from "../../../../utils/validation/auth";
import { getItemWithExpiry } from "@myCash/utils/helpers/storeLocalStorage";

interface Props {}

const SignUp: React.FC<Props> = () => {
  const { step } = useSelector(
    (state: { formStep: { step: number } }) => state.formStep
  );
  const dispatch = useDispatch();
  const { mutate, isPending } = useSignUp();

  const { registerSchema } = useAuthValidation();
  const subscription = useSelector((state: RootState) => state.subscription);

  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {

    if (step === 5) {
      if (getItemWithExpiry("device_id", String(userState.user?.id))) {
        dispatch(
          setSubscriptionDevice(
            getItemWithExpiry("device_id", String(userState.user?.id)) || ""
          )
        );
      }
      if (getItemWithExpiry("package_id", String(userState.user?.id))) {
        dispatch(
          setSubscriptionPackage(
            getItemWithExpiry("package_id", String(userState.user?.id)) || ""
          )
        );
      }
       if (
      (userState &&
        userState.user?.status === 1 && 
        getItemWithExpiry("device_id", String(userState.user?.id))&&
        getItemWithExpiry("package_id", String(userState.user?.id)))
    
    ) {
      if (localStorage.getItem("user_id") === String(userState.user?.id)) {
        // dispatch(changeStep(5));
      } else {
        dispatch(changeStep(3));
        dispatch(setSubscriptionDevice(""));
        dispatch(setSubscriptionPackage(""));
        localStorage.removeItem("device_id");
        localStorage.removeItem("package_id");
        localStorage.removeItem("user_id");
      }
    }
  
  }
    
  }, [userState]);

  const initialValues: SignUpData = {
    package_id: userState?.freeTrial
      ? "1"
      : subscription.subscriptionPayment?.package_id
      ? subscription.subscriptionPayment?.package_id
      : "",
    device_country_id: subscription.subscriptionPayment?.device_id
      ? subscription.subscriptionPayment?.device_id
      : "",
    email: userState.user?.email || "",
    phone: userState.user?.phone || "",
    password: "",
    country_id: "1",
  };

  return (
    <>
      {/* TODO:: formik re-render double register request /fix */}
      <Formik
        initialValues={initialValues}
        onSubmit={(data: SignUpData) => {
          if (data?.package_id === "1") {
            mutate(data);
            return;
          }
          if (step === 1) {
            mutate(data);
          } else if (step === 4) {
            mutate(data);
          }
        }}
        validationSchema={
          step === 1 ? toFormikValidationSchema(registerSchema) : undefined
        }
      >
        {({ errors, touched }) => (
          <Form>
            {step === 1 && (
              <SignUpFieldsStep
                errors={errors}
                touched={touched}
                isPending={isPending}
              />
            )}
            {step === 3 && <PlansStep />}
            {step === 4 && <DevicesStep />}
            {step === 5 && <RegisterPayment />}
          </Form>
        )}
      </Formik>

      {step === 2 && <OtpStep />}
    </>
  );
};

export default SignUp;
