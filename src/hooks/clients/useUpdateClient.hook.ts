import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "@myCash/apis";
import { toast } from "react-toastify";
import { CLIENTS_QUERY_KEY } from "@myCash/constants";

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: { [key: string]: string }) => updateClient(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] });
      toast.success("Client updated successfully");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return mutation;
};
