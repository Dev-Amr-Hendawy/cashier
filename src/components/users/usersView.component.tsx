import { CircularProgress, Grid } from "@mui/material";
import {
  CircularLoader,
  NoData,
  ScrollContainer,
  Table,
  UserGridCard,
} from "@myCash/common";
import { RootState, setEmployee } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";
import { usersColumns } from "./columnStructure/columnStructure";
import { useTranslation } from "react-i18next";
import { Employee, GetQuery } from "@myCash/types";

interface UsersViewProps {
  employees: Employee[];
  getUsersQuery: GetQuery<Employee>;
}

export const UsersView: React.FC<UsersViewProps> = ({
  employees,
  getUsersQuery,
}) => {
  const { t } = useTranslation();
  const isGridView = useSelector(
    (state: RootState) => state.layout.clientsGrid
  );
  const columns = usersColumns(t);
  const { hasNextPage, ref, data, isPending, isRefetching } = getUsersQuery;
  const dispatch = useDispatch();
  const rowClickHandler = (data: Employee) => {
    dispatch(setEmployee({ ...data }));
  };
  if (
    !data?.pages[0] ||
    (data?.pages[0].length === 0 && !isPending && !isRefetching)
  )
    return <NoData />;
  return (
    <ScrollContainer>
      {isPending ? (
        <CircularLoader size={200} />
      ) : isGridView ? (
        <Grid container spacing={2} padding={"0 1rem"}>
          {employees
            ? employees.map((employee) => (
                <Grid key={employee.id} item xs={6}>
                  <UserGridCard employee={employee} onClick={rowClickHandler} />
                </Grid>
              ))
            : null}
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </Grid>
      ) : (
        <>
          <Table
            columns={columns}
            rows={employees ? employees : []}
            rowClickHandler={rowClickHandler}
          />
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </>
      )}
    </ScrollContainer>
  );
};
