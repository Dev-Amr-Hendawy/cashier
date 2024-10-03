import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editCode } from "@myCash/apis";
import { useDispatch } from "react-redux";
import { setCheckCodeData, setConfirmStep } from "@myCash/lib";

export const useEditCode = (fn?: () => void) => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) => editCode(values),
    onSuccess: (data, vars) => {
      dispatch(setCheckCodeData(vars));
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "edit-code-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "edit-code-success",
        });
        dispatch(setConfirmStep("otp"));
        fn && fn();
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
