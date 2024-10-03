import { CommonModalProps } from "@myCash/types";
import { CommonModal, BackDrop } from "@myCash/common";
import { CheckOTP } from "../checkOTP/checkOTP.common";
import { setConfirmStep } from "@myCash/lib";
import { useDispatch } from "react-redux";

interface CheckOTPModalProps extends CommonModalProps {
  handleOtpConfirm: (otp: string) => void;
  handleOtpResend: () => void;
  isPending?: boolean;
}

export const CheckOTPModal: React.FC<CheckOTPModalProps> = ({
  open,
  handleClose,
  handleOtpConfirm,
  handleOtpResend,
  isPending,
}) => {
  const dispatch = useDispatch();
  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      title="checkIdentity"
      hasActions={false}
      handleBackBtn={() => dispatch(setConfirmStep("check-type"))}
    >
      <BackDrop open={isPending || false} />
      <CheckOTP
        handleOtpConfirm={handleOtpConfirm}
        handleOtpResend={handleOtpResend}
      />
    </CommonModal>
  );
};
