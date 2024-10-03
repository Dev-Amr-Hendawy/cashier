import { toast } from "react-toastify";
import { deleteClient } from "@myCash/apis";
import { CLIENTS_QUERY_KEY } from "@myCash/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IBaseApiResponse } from "@myCash/types";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useDeleteClient = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clientId: number) => deleteClient(clientId),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [CLIENTS_QUERY_KEY],
      });
      if (data?.status === 0) {
        toast.error(data?.message, {
          toastId: "delete-client-error",
        });
      } else if (data?.status === 1) {
        toast.success(data?.message, {
          toastId: "delete-client-success",
        });
      }
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });
};
