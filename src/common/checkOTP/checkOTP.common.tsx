import { Stack, Typography } from "@mui/material";
import Otp from "@myCash/components/form/Otp";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CheckOTPProps {
  handleOtpConfirm: (value: string) => void;
  handleOtpResend: () => void;
}

// TODO:: needs re-view
export const CheckOTP: React.FC<CheckOTPProps> = ({
  handleOtpConfirm,
  handleOtpResend,
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };
  const value = 5;
  return (
    <Stack spacing={4}>
      <Stack spacing={3}>
        <Typography variant="h2" color="grey.900">
          {t("signUp.stepFive.title")}
        </Typography>
        <Typography variant="subtitle1" color="grey.800">
          {t("signUp.stepFive.desc")}
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
          handleComplete={handleOtpConfirm}
        />
        <Stack direction={"row"}  >
        <Typography variant="h5" color="grey.900" textAlign="center">
          {t("signUp.stepFive.ends", {
            time: value,
          })}
        </Typography>
        <Typography
          variant="h5"
          color="primary.main"
          textAlign="center"
          onClick={handleOtpResend}
        >
          {t("signUp.stepFive.resend")}
        </Typography></Stack>
      </Stack>
    </Stack>
  );
};
