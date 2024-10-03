import { GridColDef } from "@mui/x-data-grid";
import { TableShowReport } from "@myCash/common";

export const declarationReportsColumns = (
  t: (key: string) => string,
  handleResultOpen: () => void
): GridColDef[] => [
  {
    field: "sellTax",
    headerName: t("reports.sellPriceTax"),
    flex: 1,
    sortable: false,
    renderCell(params) {
      return params?.row?.sale_invoices?.total_price || "0";
    },
  },
  {
    field: "sellNoTax",
    headerName: t("reports.sellNoTax"),
    flex: 1,
    sortable: false,
    renderCell(params) {
      return params?.row?.sale_invoices?.total_without_tax || "0";
    },
  },
  {
    field: "buyTax",
    headerName: t("reports.buyPriceTax"),
    flex: 1,
    sortable: false,
    renderCell(params) {
      return params?.row?.buy_invoices?.total_price || "0";
    },
  },
  {
    field: "buyNoTax",
    headerName: t("reports.buyNoTax"),
    type: "string",
    flex: 1,
    sortable: false,
    renderCell(params) {
      return params?.row?.buy_invoices?.total_without_tax || "0";
    },
  },
  {
    field: "total",
    headerName: t("total"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell(params) {
      return parseFloat(
        (params?.row?.$tax_total_price + params?.row?.net_total_price)?.toFixed(
          2
        ) || "0"
      );
    },
  },
  {
    field: "reportResult",
    headerName: t("reports.reportResult"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: () => (
      <TableShowReport
        handleClick={() => {
          handleResultOpen();
        }}
      />
    ),
  },
];
