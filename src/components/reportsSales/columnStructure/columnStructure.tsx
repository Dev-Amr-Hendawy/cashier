import { GridColDef } from "@mui/x-data-grid";
import { formatMoney } from "@myCash/utils";

export const salesReportsColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "start_date",
    headerName: t("dateFrom"),
    flex: 1,
    sortable: false,
    valueFormatter(params) {
      return params?.value?.split(" ")[0] || "-";
    },
  },
  {
    field: "end_date",
    headerName: t("dateTo"),
    flex: 1,
    sortable: false,  align: "center",
    headerAlign: "center",
    valueFormatter(params) {
      return params?.value?.split(" ")[0] || "-";
    },
  },
  {
    field: "total_sales_with_out_tax",
    headerName: t("reports.totalSales"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    valueFormatter(params) {
      return formatMoney(params?.value)
    },
  },
  {
    field: "total_sales_with_tax",
    headerName: t("reports.totalSales"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
     valueFormatter(params) {
      return formatMoney(params?.value)
    },
  },
  // {
  //   field: "totalReturnPrice",
  //   headerName: t("reports.totalReturned"),
  //   type: "string",
  //   flex: 1,
  //   sortable: false,
  //   align: "center",
  //   headerAlign: "center",
  // },
  {
    field: "total_cash",
    headerName: t("reports.totalCash"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    valueFormatter(params) {
      return formatMoney(params?.value)
    },
    // renderCell: (params: GridRenderCellParams) => (
    //   <ClientTablePayment
    //     status={params.row.payment_status}
    //     id={params.row.id}
    //   />
    // ),
  },
  {
    field: "total_visa",
    headerName: t("reports.totalVisa"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",  
       valueFormatter(params) {
      return formatMoney(params?.value)
    },
  },
  {
    field: "total_remaining",
    headerName: t("reports.headerCards.credit"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",     valueFormatter(params) {
      return formatMoney(params?.value)
    },
  },
];
