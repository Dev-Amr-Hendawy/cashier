import { toast } from "react-toastify";
import { deleteBranch } from "@myCash/apis";
import { BRANCHES_QUERY_KEY } from "@myCash/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IBaseApiResponse } from "@myCash/types";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useDeleteBranch = (fn?: () => void) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (branchId: number) => deleteBranch(branchId),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [BRANCHES_QUERY_KEY],
      });
      fn && fn();
      if (data?.status === 0) {
        toast.error(data?.message, {
          toastId: "delete-branch-error",
        });
      } else if (data?.status === 1) {
        toast.success(data?.message, {
          toastId: "delete-branch-success",
        });
      }
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
