import { getReportsTaxDeclaration } from "@myCash/apis";
import { REPORTS_TAX_DECLARATION_QUERY_KEY } from "@myCash/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetTaxDeclaration = (filters: {
  date_from: string;
  date_to: string;
}) => {
  return useQuery({
    queryKey: [
      REPORTS_TAX_DECLARATION_QUERY_KEY,
      filters.date_from || "",
      filters.date_to || "",
    ],
    queryFn: getReportsTaxDeclaration,
  });
};
