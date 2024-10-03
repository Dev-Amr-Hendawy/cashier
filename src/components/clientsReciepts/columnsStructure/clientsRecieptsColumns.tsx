import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { TablePaymentStatusCell } from "@myCash/common";

export const clientsRecieptsColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "id",
    headerName: t("receipt.receiptId"),
    flex: 0.5,
    sortable: false,
  },

  {
    field: "invoiceData",

    headerName: t("invoice.invoiceNo"),
    type: "string",
    flex: 0.5,
    sortable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams) => {
      return params.value?.invoiceNumber;
    },
  },
  {
    field: "date",
    headerName: t("receipt.date"),
    flex: 0.75,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: t("receipt.amount"),
    flex: 1,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },

  {
    field: "paymentStatus",
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
