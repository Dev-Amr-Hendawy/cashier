import { CheckCodeData, checkCodeApi } from "../../apis/auth/checkCode.api";

import { IBaseApiResponse, SignUpResponse } from "../../types/types";
import {
  changeStep,
  RootState,
  setSubscriptionDevice,
  setSubscriptionPackage,
  // setSubscriptionPackage
} from "@myCash/lib";
import {
  login,
  register as registerHandler,
} from "../../lib/store/slices/user-slice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { getItemWithExpiry } from "@myCash/utils/helpers/storeLocalStorage";

export const useCheckCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const userState = useSelector((state: RootState) => state.user);

  const handleSuccess = (data: SignUpResponse) => {
    if (data.status === 0) {
      toast.error(data?.message, {
        toastId: "check-code-error",
      });
    } else if (data.status === 1 && data.data?.token) {
      toast.success(data?.message || "تم تحقيق من الهاتف", {
        toastId: "check-code-success",
      });
      dispatch(
        registerHandler({
          user: data.data,
          token: data.data.token,
          status: data.data.status,
        })
      );

      if (location.pathname === "/sign-up") {
      

        if (userState?.freeTrial||data?.data?.subscription?.package?.id===1) {
        
          navigate("/complete-system-info");
          dispatch(changeStep(1));
        } else  if (!userState?.freeTrial||data?.data?.subscription?.package?.id!==1){
          
          if (localStorage.getItem("user_id") === String(userState.user?.id)&&getItemWithExpiry("package_id", String(userState.user?.id))) {
                 dispatch(changeStep(5));
               } else {
                 dispatch(setSubscriptionDevice(""));
                 dispatch(setSubscriptionPackage(""));
                 localStorage.removeItem("device_id");
                 localStorage.removeItem("package_id");
                 localStorage.removeItem("user_id");
                 dispatch(changeStep(3))
               }
      

          }
      } else if (location.pathname === "/login") {
        navigate("/");
      } else {
        navigate(`/forget-password?step=3&type=${searchParams.get("type")}`);
        dispatch(login(data?.data));
      }
    }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: CheckCodeData) => checkCodeApi(values),
    onSuccess(data) {
      handleSuccess(data);
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
