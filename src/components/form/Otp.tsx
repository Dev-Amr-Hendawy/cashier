import { Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  otp: string;
  handleChange: (otp: string) => void;
  handleComplete?: (value: string) => void;
};

const Otp = ({ otp, handleChange, handleComplete=()=>{} }: Props) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);
  const validateChar = (character: string) => {
    const pattern = /^[0-9]*$/;
    const isValid = pattern.test(character);
    if (!isValid) {
      setHasError(true);
    } else {
      setHasError(false);
    }
    return isValid;
  };
  return (
    <>
      <MuiOtpInput
        autoFocus
        length={6}
        value={otp}
        validateChar={validateChar}
        onChange={handleChange}
        onComplete={handleComplete}
        color="secondary.main"
        sx={{
          flexDirection: "row-reverse",

          "& .MuiOutlinedInput-root": {
            borderRadius: "1rem",
            fontSize: "2rem",
          },
        }}
      />
      {hasError && (
        <Typography variant="h5" color={"error.main"}>
          {t("validation.pattern2")}
        </Typography>
      )}
    </>
  );
};

export default Otp;
