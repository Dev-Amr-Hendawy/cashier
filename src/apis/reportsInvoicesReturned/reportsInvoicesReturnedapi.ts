import { ReportsReturnedInvoices } from "@myCash/types";
import axios from "axios";

const REPORTS_INVOICES_RETURNED_BASE_URL = "/sales/report/cal_return_report";

export const getreportsInvoicesReturned= async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${REPORTS_INVOICES_RETURNED_BASE_URL}?saleOrBuy=1&page=${props.pageParam}&date_from=${props.queryKey[1]}&date_to=${props.queryKey[2]}&invoiceType=${props.queryKey[3]}
    &branch_id=${props.queryKey[4]}`
  );



  return {
    reportsInvoices: response?.data?.data?.invoices?.data as ReportsReturnedInvoices[],
    report: {total_returned_amount: response?.data?.data?.total_returned_amount,
      invoicesCount: response?.data?.data?.invoices?.pagination?.total,
    },
  };
};