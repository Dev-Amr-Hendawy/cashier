import { ReportsTaxDeclaration } from "@myCash/types";
import axios from "axios";

const REPORTS_TAX_DECLARATION_BASE_URL = "/sales/taxReport/cal_report";
export const getReportsTaxDeclaration = async (props: {
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${REPORTS_TAX_DECLARATION_BASE_URL}?date_from=${props.queryKey[1]}&date_to=${props.queryKey[2]}`
  );

  return response?.data?.data as ReportsTaxDeclaration;
};
