import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBranch } from "@myCash/apis";
import { toast } from "react-toastify";
import { BRANCHES_QUERY_KEY } from "@myCash/constants";
import { useDispatch } from "react-redux";
import { setBranch } from "@myCash/lib";
import { AxiosError } from "axios";
import { IBaseApiResponse } from "@myCash/types";
import { useTranslation } from "react-i18next";

export const useUpdateBranch = (fn?: () => void) => {
  const {t}=useTranslation();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) => updateBranch(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [BRANCHES_QUERY_KEY] });
      fn && fn();
      dispatch(setBranch(data.data?.data));
      if (data?.data?.status === 0) {
        toast.error(data?.data.message, {
          toastId: "update-branch-error",
        });
      } else if (data?.data?.status == 1) {
        toast.success(data?.data?.message, {
          toastId: "update-branch-success",
        });
      }
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
