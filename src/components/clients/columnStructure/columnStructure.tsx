import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ClientTablePayment } from "@myCash/common";

export const clientsColumns = (t: (key: string) => string): GridColDef[] => [
  {
    field: "name",
    headerName: t("client.client"),
    flex: 1,
    sortable: false,
  },
  {
    field: "phone",
    headerName: t("phone"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: t("email"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "reciepts",
    headerName: t("client.reciepts"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => (
      <ClientTablePayment
        status={params.row.payment_status}
        id={params.row.id}
      />
    ),
  },
];
