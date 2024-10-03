import { setReportsExpensesData, store } from "@myCash/lib";
import { ReportsExpenses } from "@myCash/types";
import axios from "axios";

const REPORTS_EXPENSES_BASE_URL = "/sales/expenseReport/cal_report";
export const getReportsExpenses = async (props: {
  pageParam: number | false;
  queryKey: (string | null)[];
}) => {
  const response = await axios.get(
    `${REPORTS_EXPENSES_BASE_URL}?page=${props.pageParam}&date_from=${props.queryKey[1]}&date_to=${props.queryKey[2]}
      `
  );
  if (response?.data?.data?.report) {
    store.dispatch(
      setReportsExpensesData({
        report: response?.data?.data?.report,
        totalExpenses: response?.data?.data?.expenses?.total_expenses,
        expensesCount: response?.data?.data?.expenses?.pagination?.total,
      })
    );
  }
  return response?.data?.data?.expenses?.data as ReportsExpenses[];
};
