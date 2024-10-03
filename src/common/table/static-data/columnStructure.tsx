import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TablePaymentStatusCell } from "@myCash/common";

export const dummyColumns = (t: (key: string) => string): GridColDef[] => [
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
  },
  {
    field: "email",
    headerName: t("email"),
    type: "string",
    flex: 1,
    sortable: false,
  },

  {
    field: "articles",
    headerName: t("articles"),
    type: "string",
    flex: 1,
    sortable: false,
  },
  {
    field: "subscribers",
    headerName: t("subscribers"),
    type: "string",
    flex: 1,

    sortable: false,
    // width: 220,
    // renderCell: (params: GridRenderCellParams) => (
    //   <TableDiscountCell
    //     icon={<TableSalesIcon />}
    //     price={params.value}
    //     discount={params.row.discount}
    //   />
    // ),
  },
  {
    field: "sales",
    headerName: t("sales"),
    type: "string",
    flex: 1,

    sortable: false,
    // width: 220,
    // renderCell: (params: GridRenderCellParams) => (
    //   <TableDiscountCell
    //     icon={<TableSalesIcon />}
    //     price={params.value}
    //     discount={params.row.discount}
    //   />
    // ),
  },
  {
    field: "status",
    headerName: t("status"),
    type: "string",
    flex: 1,
    sortable: false,

    // width: 220,
    renderCell: (params: GridRenderCellParams) => (
      <TablePaymentStatusCell status={params.value} />
    ),
  },
];
