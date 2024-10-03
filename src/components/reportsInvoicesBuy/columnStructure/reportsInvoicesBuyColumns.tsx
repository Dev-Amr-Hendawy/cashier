import { GridColDef } from "@mui/x-data-grid";

export const reportsInvoicesBuyColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "id",
    headerName: t("invoice.invoiceNo"),
    flex: 1,
    sortable: false,
  },
  {
    field: "paymentType",
    headerName: t("paymentMethod.title"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell(params) {
      let content;
      switch (params?.value) {
        case 1:
          content = t("payment.cash");
          break;
        case 2:
          content = t("payment.visa");
          break;
        case 3:
          content = t("payment.credit");
          break;
        case 4:
          content = t("payment.payment.cash-visa");
          break;
        case 5:
          content = t("payment.payment.cash-credit");
          break;
        case 6:
          content = t("payment.installment");
          break;
        default:
          content = null;
      }
      return <div>{content}</div>;
    },
  },
  {
    field: "totalPrice",
    headerName: t("invoice.total"),
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
