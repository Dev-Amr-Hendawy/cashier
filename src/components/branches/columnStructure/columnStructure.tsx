import { GridColDef } from "@mui/x-data-grid";
import { ActiveBranchSwitch, BranchStatusCell } from "@myCash/common";

export const branchesColumns = (
  t: (key: string) => string,
  updateHandler: (values: { [key: string]: string }) => void
): GridColDef[] => [
  {
    field: "name",
    headerName: t("branch"),
    flex: 1,
    sortable: false,
  },
  {
    field: "status",
    headerName: t("status"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <BranchStatusCell isMain={params.row.isMain} value={params.value} />
    ),
  },
  {
    field: "address",
    headerName: t("branches.form.address"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: t("phone"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "activateBranch",
    headerName: t("branches.activateBranch"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <ActiveBranchSwitch
        status={params.row.status}
        handleSwitch={(e) =>
          updateHandler({
            branch_id: params.row.id,
            // isMain: "0",
            status: e ? "1" : "2",
          })
        }
      />
    ),
  },
];
