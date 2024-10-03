import { SINGLE_INVOICE_QUERY_KEY } from "@myCash/constants";
import { getInvoiceSingle } from "@myCash/apis";
import { useQuery } from "@tanstack/react-query";

export const useGetInvoice = (id: string) => {
  return useQuery({
    queryKey: [SINGLE_INVOICE_QUERY_KEY, id],
    queryFn: () => getInvoiceSingle(id),
  });
};
