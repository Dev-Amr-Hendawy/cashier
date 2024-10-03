import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClient } from "../../apis/clients/clients.api";
import { toast } from "react-toastify";
import { CLIENTS_QUERY_KEY } from "@myCash/constants";

export const useAddClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: { [key: string]: string }) => addClient(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] });
      if (data?.data.status === 0) {
        toast.error(data?.data?.message, {
          toastId: "add-client-error",
        });
      } else if (data?.data.status === 1) {
        toast.success(data?.data?.message, {
          toastId: "add-client-success",
        });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return mutation;
};
