import { GridColDef } from "@mui/x-data-grid";

export const expensesColumns = (t: (key: string) => string): GridColDef[] => [
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
    field: "amount",
    headerName: t("expenses.expenseAmount"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: t("timing"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
];
