import { useDispatch, useSelector } from "react-redux";
import { ConfirmTypeModal } from "../confirmTypeModal";
import { RootState, setConfirmStep } from "@myCash/lib";
import { CheckOTPModal } from "../checkOtpModal";
import { useCallback } from "react";

interface ConfirmUserCycleProps {
  handleOtpConfirm: (otp: string) => void;
  handleOtpResend: () => void;
  otpLoading?: boolean;
}

export const ConfirmUserCycle: React.FC<ConfirmUserCycleProps> = ({
  handleOtpConfirm,
  handleOtpResend,
  otpLoading,
}) => {
  const { step } = useSelector((state: RootState) => state.confirmUser);
  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(setConfirmStep("")), []);
  return (
    <>
      <ConfirmTypeModal
        // handleClose={() => dispatch(setConfirmStep(""))}
        handleClose={handleClose}
        open={step === "check-type"}
      />
      <CheckOTPModal
        // handleClose={() => dispatch(setConfirmStep(""))}
        handleClose={handleClose}
        open={step === "otp"}
        handleOtpConfirm={handleOtpConfirm}
        handleOtpResend={handleOtpResend}
        isPending={otpLoading}
      />
    </>
  );
};
