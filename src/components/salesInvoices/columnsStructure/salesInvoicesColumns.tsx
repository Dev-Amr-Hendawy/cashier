import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TablePaymentStatusCell } from "@myCash/common";

export const salesInvoicesColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "courses",
    headerName: t("Courses"),
    flex: 1,
    sortable: false,
  },
  {
    field: "name",
    headerName: t("name"),
    flex: 1,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },

  {
    field: "sales",
    headerName: t("sales"),
    type: "string",
    flex: 1,

    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: t("status"),
    type: "string",
    flex: 1,
    sortable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams) => (
      <TablePaymentStatusCell status={params.value} />
    ),
  },
];
