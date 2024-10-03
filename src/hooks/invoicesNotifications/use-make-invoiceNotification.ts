import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { INVOICES_NOTIFICATIONS_QUERY_KEY } from "@myCash/constants";
import { addInvoiceNotification } from "@myCash/apis";
// import { useNavigate } from "react-router-dom";

export const useMakeInvoiceNotification = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: { [key: string]: unknown }) =>
      addInvoiceNotification(values),
    onSuccess: (data) => {
      if (data?.status === 0) {
        toast.error(data?.message || "Something Wrong Happened", {
          toastId: "add-invoiceNotification-error",
        });
      } else if (data?.status === 1) {
        queryClient.invalidateQueries({
          queryKey: [INVOICES_NOTIFICATIONS_QUERY_KEY],
        });
        toast.success(data?.message || "Success", {
          toastId: "add-invoiceNotification-success",
        });
        // navigate("/invoices-notifications");
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
