import { CircularLoader } from "@myCash/common";
import { AccountInfoContent } from "@myCash/components";
import {
  useGetInfo,
  useResendOtp,
  useUpdateEmail,
  useUpdatePhone,
  useUpdateProfile,
} from "@myCash/hooks";
import {
  RootState,
  setConfirmStep,
  setMainData,
  setUpdateType,
} from "@myCash/lib";
import { IAccountInfoResponse } from "@myCash/types";
import { useDispatch, useSelector } from "react-redux";

interface AccountInfoHocProps {}

export const AccountInfoHoc: React.FC<AccountInfoHocProps> = () => {
  const { data, isFetching } = useGetInfo();
  const dispatch = useDispatch();
  const updateHandler = (
    value: { [key: string]: string },
    type: "email" | "phone" | "profile"
  ) => {
    dispatch(setMainData(value));
    dispatch(setConfirmStep("check-type"));
    dispatch(setUpdateType(type));
  };
  const { mutate: handleResendOtp, isPending: resendPending } = useResendOtp();
  const { mutate: updateEmail, isPending: updateEmailPending } =
    useUpdateEmail();
  const { mutate: updatePhone, isPending: updatePhonePending } =
    useUpdatePhone();
  const { mutate: updateProfile, isPending: updateProfilePending } =
    useUpdateProfile();
  const checkOtpData = useSelector(
    (state: RootState) => state.confirmUser.checkCode
  );
  const confirmUser = useSelector((state: RootState) => state.confirmUser);
  const updateProfileHandler = (values: { [key: string]: string }) => {
    updateProfile(values);
  }
  const checkOtp = (code: string) => {
    // checkOtpMutate({
    //   code,
    //   email: checkOtpData.email,
    //   type: checkOtpData.type,
    //   phone: checkOtpData.phone,
    // });

    // if (confirmUser.updateType && confirmUser.updateType === "profile") {
    if (confirmUser.updateType === "email") {
      updateEmail({ code, email: confirmUser.confirmValues.email });
    } else if (confirmUser.updateType === "phone") {
      updatePhone({ code, phone: confirmUser.confirmValues.key });
    }
    // }
    // else if (type === "settings") {
    //   updateInvoiceInfo(confirmUser.confirmValues);
    // }
    // dispatch(setConfirmStep(""));
  };
  const resendOtp = () => {
    handleResendOtp({
      email: checkOtpData.email,
      type: checkOtpData.type,
      phone: checkOtpData.phone,
      country_id: "1",
    });
  };
  return (
    <>
      {isFetching ? (
        <CircularLoader size={200} />
      ) : (
        <AccountInfoContent
          data={data ?? ({} as IAccountInfoResponse)}
          checkOtp={checkOtp}
          resendOtp={resendOtp}
          updateHandler={updateHandler}
          updateProfileHandler={updateProfileHandler}
          checkOtpPending={
            updateEmailPending || updatePhonePending 
          }
          profilePending={updateProfilePending}
          resendPending={resendPending}
        />
      )}
    </>
  );
};
