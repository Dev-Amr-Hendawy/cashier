import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { INVOICES_NOTIFICATIONS_TYPE } from "@myCash/constants";
import { formatMoney } from "@myCash/utils";

export const InvoicesNotificationsColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "id",
    headerName: t("invoiceNotificationNumber"),
    flex: 1,
    sortable: false,
  },
  {
    field: "invoice",
    headerName: t("invoice.invoiceNo"),
    flex: 1,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <div>{params.value?.invoiceNumber || params.value?.id}</div>
    ),
  },

  {
    field: "products",
    headerName: t("productsNo"),
    type: "string",
    flex: 1,
    sortable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams) => (
      <div>{params.value?.length}</div>
    ),
  },
  {
    field: "totalPrice",
    headerName: t("invoiceNotificationAmount"),
    flex: 1,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <div>{formatMoney(params.value)}</div>
    ),
  },
  {
    field: "type",
    headerName: t("invoiceNotificationType"),
    flex: 1,
    sortable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams) => (
      <div>
        {params.value === INVOICES_NOTIFICATIONS_TYPE.CREDITOR
          ? t("creditorInvoice")
          : t("debtorInvoice")}
      </div>
    ),
  },

  {
    field: "date",
    headerName: t("timing"),
    type: "string",
    flex: 1.5,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
];
