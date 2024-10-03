import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { TableUserCell } from "@myCash/common";

export const usersColumns = (t: (key: string) => string): GridColDef[] => [
  {
    field: "name",
    headerName: t("users.user"),
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <Stack>
          {params.row?.type == 1 ? (
            <TableUserCell value={params.value} />
          ) : (
            params.value
          )}
        </Stack>
      );
    },
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
    field: "branch",
    headerName: t("branch"),
    type: "string",
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row?.mainBranch?.name || ""}</div>;
    },
  },
];
