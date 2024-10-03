import { LoginData, login } from "../../apis/auth/login";

import { AuthResponseType } from "../../types/types";
import { AxiosError } from "axios";
import {
  login as loginHandler,
  setFreeTrail,
} from "../../lib/store/slices/user-slice";
import { changeStep, setTaxPercentage } from "@myCash/lib";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = (data: AuthResponseType) => {
    console.log( data?.data ,
      data?.data?.status === 1 ,
      data?.data?.subscription.package?.id );
    
    if (data?.data && data?.data?.status === 2) {
      toast.error(data?.message, { toastId: "user-status-error" });
      dispatch(changeStep(2));
      if (
        data?.data?.paymentStatus === 1 &&
        data?.data?.subscription.package?.id === 1
      ) {
        dispatch(setFreeTrail(true));
      }
      navigate("/sign-up");
    } else if (
      data?.data &&
      data?.data?.paymentStatus === 1 &&
      data?.data?.isCompleteAccountInfo === 0
    ) {
      navigate("/complete-system-info");
    }  else if (
      data?.data &&
      data?.data?.status === 1 &&
      !data?.data?.subscription.package&&!data?.data?.subscription.package?.id 
    ) {
      dispatch(changeStep(3));
      navigate("/sign-up");
    } else if (
      data?.data &&
      data?.data?.status === 1 &&
      data?.data?.subscription.package?.id &&
      data?.data?.subscription.package?.id !== 1&&  data?.data?.paymentStatus !== 1
    ) {
      dispatch(changeStep(5));
      navigate("/sign-up");
    }

    if (data?.status === 0) {
      toast.error(data?.message, {
        toastId: "loginError",
      });
    } else if (data.status === 1) {
      // if (data?.data?.status === 2) {
      //   toast.error(data?.message, { toastId: "user-status-error" });
      // }
      dispatch(
        loginHandler({
          user: data?.data,
          token: data?.data?.token,
          status: data?.data?.status,
        })
      );

      dispatch(
        setTaxPercentage(Number(data?.data?.accountInfo?.tax) / 100) || 0
      );
      if(data?.data &&  data?.data?.paymentStatus === 1&&data?.data?.isCompleteAccountInfo === 1&&data?.data?.subscription.package?.id) navigate("/");
    }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: LoginData) => login(values),
    onSuccess(data) {
      handleSuccess(data);
    },
    onError(AxiosError: AxiosError<{ message?: string }>) {
      toast.error(
        AxiosError.response?.data?.message || "Something went wrong",
        {
          toastId: "registerError",
        }
      );
    },
  });
};
