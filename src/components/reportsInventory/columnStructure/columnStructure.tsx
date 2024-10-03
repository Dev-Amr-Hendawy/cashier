import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TableShowReport } from "@myCash/common";
import { InventoryReport } from "@myCash/types";

export const inventoryReportsColumns = (
  t: (key: string) => string,
  handleShowReport: (data: InventoryReport) => void
): GridColDef[] => [
  {
    field: "created_at",
    headerName: t("date"),
    flex: 1,
    sortable: false,
    valueFormatter(params) {
      return params?.value?.split(" ")[0] || "-";
    },
  },
  {
    field: "id",
    headerName: t("reports.reportNumber"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
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
    field: "reportResult",
    headerName: t("reports.reportResult"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => (
      <TableShowReport
        handleClick={() => {
          console.log("clicked");
          handleShowReport(params?.row);
        }}
      />
    ),
  },
  // {
  //   field: "totalVisaPrice",
  //   headerName: t("reports.totalVisa"),
  //   type: "string",
  //   flex: 1,
  //   sortable: false,
  //   align: "center",
  //   headerAlign: "center",
  // },
  // {
  //   field: "totalRemainingPrice",
  //   headerName: t("reports.headerCards.credit"),
  //   type: "string",
  //   flex: 1,
  //   sortable: false,
  //   align: "center",
  //   headerAlign: "center",
  // },
];
