import { Branch, GetQuery } from "@myCash/types";
import { useTranslation } from "react-i18next";
import { RootState, setBranch } from "@myCash/lib";
import { CircularProgress, Grid } from "@mui/material";
import { BranchGridCard, CircularLoader, NoData, Table } from "@myCash/common";
import { useDispatch, useSelector } from "react-redux";

import { branchesColumns } from "./columnStructure/columnStructure";
import { useUpdateBranch } from "@myCash/hooks";

interface BranchesViewProps {
  branches: Branch[];
  getBranchesQuery: GetQuery<Branch>;
}

export const BranchesView: React.FC<BranchesViewProps> = ({
  branches,
  getBranchesQuery,
}) => {
  const { t } = useTranslation();
  const isGridView = useSelector(
    (state: RootState) => state.layout.clientsGrid
  );
  const { mutate } = useUpdateBranch();
  const updateHandler = (values: { [key: string]: string }) => {
    mutate(values);
  };
  const columns = branchesColumns(t, updateHandler);
  const { hasNextPage, ref, data, isPending, isRefetching } = getBranchesQuery;
  // const branches = data?.pages?.flat();
  const dispatch = useDispatch();
  const rowClickHandler = (data: Branch) => {
    dispatch(setBranch({ ...data }));
  };
  if (
    !data?.pages[0] ||
    (data?.pages[0].length === 0 && !isPending && !isRefetching)
  )
    return <NoData />;
  return (
    <>
      {isPending || isRefetching ? (
        <CircularLoader size={200} />
      ) : isGridView ? (
        <Grid container spacing={2}>
          {branches
            ? branches.map((branch) => (
                <Grid key={branch?.id} item xs={6}>
                  <BranchGridCard branch={branch} onClick={rowClickHandler} />
                </Grid>
              ))
            : null}
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </Grid>
      ) : (
        <>
          <Table
            columns={columns}
            rows={branches ? branches : []}
            rowClickHandler={rowClickHandler}
          />
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </>
      )}
    </>
  );
};
