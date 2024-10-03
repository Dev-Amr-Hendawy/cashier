import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../../apis/auth/payment.api";

import { toast } from "react-toastify";

export const usePaymentLink = (fn?: () => void) => {

  return useMutation({
    mutationFn: (data: { [key: string]: string }) => paymentApi(data),
    onSuccess: async (data) => {
      if (data?.status === 1) {
        if(data?.data==="-1") {return toast.error("An error occurred", { toastId: "payment-link-error" });}
        // toast.success("Payment link generated successfully", {
        //   toastId: "payment-link-success",
        // });
  
        const win = window.open(data?.data, "_blank");
        win?.focus();
    
    
        fn && fn();

      } else if (data?.status === 0) {
        toast.error("An error occurred", { toastId: "payment-link-error" });
      }
    },
  });
};
