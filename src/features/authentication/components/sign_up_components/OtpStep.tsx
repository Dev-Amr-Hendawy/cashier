import {
  RootState,
  //  logout, setFreeTrail
} from "@myCash/lib";
import { Button as ButtonMui, Stack, Typography } from "@mui/material";
import { useCheckCode, useResendCode } from "../../../../hooks/auth-hooks";
import { useDispatch, useSelector } from "react-redux";
// import AuthInfo from "../AuthInfo";
// import BackButton from "../../../../components/ui/BackButton";
import Otp from "../../../../components/form/Otp";
import { changeStep } from "../../../../lib/store/slices/form-step";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AuthStepsLayout from "./AuthStepsLayout";
import AuthFormLayoutNew from "../AuthFormLayoutNew";
import NewBackButtonV2 from "@myCash/components/ui/NewBackButtonV2";
import NewLanguageButton from "@myCash/components/ui/NewLanguageButton";
import Button from "@myCash/components/form/Button";

// import { AccountInfo } from "../../../../types/types";

interface Props {
  noAuthInfo?: boolean;
}

const OtpStep: React.FC<Props> = (props) => {
  // const { t } = useTranslation();

  return (
    <AuthStepsLayout
      rightComponent={<NewLanguageButton position="absolute" />}
      component={<OtpContent {...props} />}
    />
  );
};

export default OtpStep;

interface OtpStepContent { }
export const OtpContent: React.FC<OtpStepContent> = () => {
  const [timeLeft, setTimeLeft] = useState(59);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  // freeTrial, status
  const { user } = useSelector((state: RootState) => state.user);
  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };
  const { mutate: checkCodeMutate, isPending } = useCheckCode();
  const { mutate: resendCodeMutate } = useResendCode();

  const handleComplete = (value: string) => {
    if (user) {
      checkCodeMutate({ email: user.email, phone: user.phone, code: value });
    }
  };
  const handleResendCode = () => {
    if (user) {
      resendCodeMutate({ phone: user.phone, country_id: "1", type: "1" });
      setTimeLeft(59);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // const value = 5;
  return (
    <AuthFormLayoutNew showLogo={false}>
      <NewBackButtonV2
        onClick={() => {
          // if (freeTrial || status === 2) {
          //   dispatch(logout());
          //   navigate("/loginx");
          //   dispatch(setFreeTrail(false));
          //   return;
          // }
          dispatch(changeStep(1));
        }}
      />

      <Stack spacing={4}>
        <Stack spacing={3}>
          <Typography variant="h2" color="grey.900">
            {t("signUp.stepFive.title")}
          </Typography>
          <Typography variant="subtitle1" color="grey.800">
            {t("signUp.stepFive.desc", {
              phone: `+966 ${user?.phone}`,
            })}
          </Typography>
        </Stack>
        <Stack
          alignSelf="center"
          sx={{
            width: "85%",
          }}
          spacing={2}
        >
          <Otp
            otp={otp}
            handleChange={handleChange}
          />

          <Button
            loading={isPending}
            disabled={isPending || otp.length!== 6}
            text={t("signUp.stepFive.btn")}
            variant="contained"

            onClick={() => handleComplete(otp)}
          />

          <Stack
            direction={"row"}
            spacing={2}
            textAlign="center"
            justifyContent={"center"}
          >
            <Typography variant="body1" color="grey.900" textAlign="center">
              {timeLeft > 0
                ? t("signUp.stepFive.ends", {
                  time: `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`,
                })
                : "00:00"}
            </Typography>

            <ButtonMui
              variant="text"
              disabled={timeLeft > 0}
              sx={{ p: 0 }}
              onClick={handleResendCode}
            >
              {t("signUp.stepFive.resend")}
            </ButtonMui>
          </Stack>
        </Stack>
      </Stack>
    </AuthFormLayoutNew>
  );
};
