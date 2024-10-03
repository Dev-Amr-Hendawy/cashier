import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignUpResponse } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState, setConfirmStep } from "@myCash/lib";
import { ACCOUNT_QUERY_KEY, SETTINGS_QUERY_KEY } from "@myCash/constants";
import { checkOtpApi } from "@myCash/apis";
import { useCompleteInfo, useUpdateEmail, useUpdatePhone } from "@myCash/hooks";

export const useCheckOtp = (type: "profile" | "settings") => {
  const dispatch = useDispatch();
  const { mutate: updateEmail } = useUpdateEmail();
  const { mutate: updatePhone } = useUpdatePhone();
  const { mutate: updateInvoiceInfo } = useCompleteInfo();
  const confirmUser = useSelector((state: RootState) => state.confirmUser);
  const queryClient = useQueryClient();
  const handleSuccess = (data: SignUpResponse, code: string) => {
    if (data.status === 0) {
      toast.error(data?.message, {
        toastId: "check-otp-error",
      });
    } else if (data.status === 1) {
      toast.success(data?.message, {
        toastId: "check-otp-success",
      });
      if (type === "profile") {
        if (confirmUser.updateType === "email") {
          updateEmail({ code, ...confirmUser.confirmValues });
        } else if (confirmUser.updateType === "phone") {
          updatePhone({ code, ...confirmUser.confirmValues });
        }
      } else if (type === "settings") {
        updateInvoiceInfo(confirmUser.confirmValues);
      }
      dispatch(setConfirmStep(""));

      queryClient.invalidateQueries({
        queryKey: [
          type === "settings" ? SETTINGS_QUERY_KEY : ACCOUNT_QUERY_KEY,
        ],
      });
    }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: { [key: string]: string }) => checkOtpApi(values),
    onSuccess(data, variables) {
      handleSuccess(data, variables.code);
    },
    onError() {
      toast.error("Error Occuured!");
    },
  });
};
