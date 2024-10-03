import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { REPORTS_INVENTORY_QUERY_KEY } from "@myCash/constants";
import { addReportsInventory } from "@myCash/apis";
import { useTranslation } from "react-i18next";

export const useAddReportInventory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      addReportsInventory(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [REPORTS_INVENTORY_QUERY_KEY],
      });
      if (data?.data.status === 0) {
        toast.error(data?.data?.message || t("reports.reportAddError"), {
          toastId: "add-report-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message || t("reports.reportAddSuccess"), {
          toastId: "add-report-success",
        });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
