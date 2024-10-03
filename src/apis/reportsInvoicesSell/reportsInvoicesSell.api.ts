import { setReportsInvoicesSell, store } from "@myCash/lib";
import { ReportsInvoices } from "@myCash/types";
import axios from "axios";

const REPORTS_INVOICES_SELL_BASE_URL = "/sales/report/cal_report";

export const getreportsInvoicesSell = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${REPORTS_INVOICES_SELL_BASE_URL}?saleOrBuy=1&page=${props.pageParam}&date_from=${props.queryKey[1]}&date_to=${props.queryKey[2]}&invoiceType=${props.queryKey[3]}
    &branch_id=${props.queryKey[4]}`
  );

  if (response?.data?.data?.report) {
    store.dispatch(
      setReportsInvoicesSell({
        report: {
          ...response?.data?.data?.report,
          invoicesCount: response?.data?.data?.invoices?.pagination?.total,
        },
      })
    );
  }

  return {
    reportsInvoices: response?.data?.data?.invoices?.data as ReportsInvoices[],
    report: {
      ...response?.data?.data?.report,
      invoicesCount: response?.data?.data?.invoices?.pagination?.total,
    },
  };
};
