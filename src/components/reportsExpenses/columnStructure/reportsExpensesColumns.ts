import { GridColDef } from "@mui/x-data-grid";

export const reportsExpensesColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "id",
    headerName: t("expenses.expenseId"),
    flex: 1,
    sortable: false,
  },
  {
    field: "statement",
    headerName: t("expenses.expense"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalAmount",
    headerName: t("expenses.expenseAmount"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: t("date"),
    flex: 1,
    sortable: false,
    valueFormatter(params) {
      return params?.value?.split(" ")[0] || "-";
    },
  },
];
