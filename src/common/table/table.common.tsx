import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./styles.css";
import { t } from "i18next";
import { rowsTest } from ".";
import { dummyColumns } from "./static-data/columnStructure";
import { NoData } from "../noData";

interface TableProps {
  columns: GridColDef[];
  // TODO:: change type when fetch from api
  //eslint-disable-next-line
  rows: any[];
  //eslint-disable-next-line
  rowClickHandler?: (data: any) => void;
  disableCheckBox?: boolean[];
}

export const Table: React.FC<TableProps> = ({
  columns = dummyColumns(t),
  rows = rowsTest,
  rowClickHandler,
}) => {
  return (
    <Box className="table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        className="main-table"
        disableColumnMenu
        checkboxSelection={false}
        rowHeight={62}
        autoHeight
        // pagination={false}
        slots={{
          columnResizeIcon: () => null,
          noRowsOverlay: () => <NoData />,
        }}
        onRowClick={(event) => {
          rowClickHandler && rowClickHandler(event?.row);
        }}
        sx={{
          "--DataGrid-overlayHeight": "50vh",
        }}
        // disableRowSelectionOnClick
      />
    </Box>
  );
};
