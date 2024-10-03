import { getNotificationSingle } from "@myCash/apis";
import { SINGLE_INVOICE_QUERY_KEY } from "@myCash/constants";

import { useQuery } from "@tanstack/react-query";

export const useGetNotification = (id: string) => {
  return useQuery({
    queryKey: [SINGLE_INVOICE_QUERY_KEY, id],
    queryFn: () => getNotificationSingle(id),
  });
};
