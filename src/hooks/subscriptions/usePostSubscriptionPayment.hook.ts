import { postSubscriptionPayment } from "@myCash/apis/subscriptions";
import { ACCOUNT_QUERY_KEY } from "@myCash/constants";
import { clearSubscriptionPayment, setSubscriptionStep } from "@myCash/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAddSubscriptionPayment = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      postSubscriptionPayment(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "add-payment-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message || "Success!", {
          toastId: "add-payment-success",
        });
        const win = window.open(data?.data?.data, "_blank");
        win?.focus();
        // const link = document.createElement("a");
        // link.href = data?.data?.data;
        // link.target = "_blank";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        dispatch(clearSubscriptionPayment());
        if (location.pathname === "/sign-up") {
          navigate("/");
          return;
        }
        dispatch(setSubscriptionStep(1));
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
