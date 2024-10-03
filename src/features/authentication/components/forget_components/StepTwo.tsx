import { Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Otp from "../../../../components/form/Otp";
import BackButton from "../../../../components/ui/BackButton";
import Fading from "../../../../components/ui/animation/Fading";
import { useCheckCode, useResendCode } from "../../../../hooks/auth-hooks";

const StepTwo = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [otp, setOtp] = useState("");
  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };
  const { mutate: checkCodeMutate } = useCheckCode();
  const { mutate: resendCodeMutate, isPending: resendPending } =
    useResendCode();

  const handleComplete = (value: string) => {
    checkCodeMutate({
      email: searchParams.get("email") || "",
      phone: searchParams.get("phone") || "",
      type: searchParams.get("type") || "2",
      code: value,
      active: "1",
    });
  };
  const handleResendCode = () => {
    resendCodeMutate({
      email: searchParams.get("email") || "",
      phone: searchParams.get("phone") || "",
      type: searchParams.get("type") || "2",
      country_id: searchParams.get("country_id") || "1",
      active: "1",
    });
  };
  const value = 5;
  return (
    <Fading>
      <BackButton
        onClick={() => {
          setSearchParams({ type: "2", step: "1" });
        }}
      />
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
            handleComplete={handleComplete}
          />
          <Typography variant="body1" color="grey.900" textAlign="center">
            {t("signUp.stepFive.ends", {
              time: value,
            })}
          </Typography>
          <StyledTypography
            variant="h5"
            color="secondary.main"
            textAlign="center"
            onClick={handleResendCode}
            disabled={resendPending}
          >
            {t("signUp.stepFive.resend")}
          </StyledTypography>
        </Stack>
      </Stack>
    </Fading>
  );
};

export default StepTwo;

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<{
  disabled: boolean;
}>(({ theme, disabled }) => ({
  cursor: "pointer",
  color: disabled ? theme.palette.grey[800] : theme.palette.secondary.main,
}));
