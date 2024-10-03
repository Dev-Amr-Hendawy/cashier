import { clearCart, setTaxPercentage } from "../../lib/store/slices/cart-slice";

import { AuthResponseType, IBaseApiResponse } from "../../types/types";
import { logout } from "../../apis/index";
import { logout as logoutHandler } from "../../lib/store/slices/user-slice";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSuccess = (data: AuthResponseType) => {
    if (data?.status === 0) {
      toast.error(data?.message || t("error"));
    }
    //  else if (data?.data?.status === 1) {
    //   dispatch(setIsOpen(false));
    // }
  };

  // handle Error

  return useMutation({
    mutationFn: (values: { [key: string]: string }) => logout(values),
    onSuccess(data) {
      handleSuccess(data);
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
    onSettled() {
      dispatch(clearCart());
      dispatch(logoutHandler());
      dispatch(setTaxPercentage(0));
      navigate("/login");
    },
  });
};
