import { Expense } from "@myCash/types";
import { useTranslation } from "react-i18next";
import { RootState, setExpense } from "@myCash/lib";
import { CircularProgress, Grid } from "@mui/material";
import { CircularLoader, ExpenseGridCard, NoData, Table } from "@myCash/common";
import { useDispatch, useSelector } from "react-redux";

import { expensesColumns } from "./columnStructure/columnStructure";
import { useGetExpenses } from "@myCash/hooks/expenses";

interface ExpensesViewProps {}

export const ExpensesView: React.FC<ExpensesViewProps> = () => {
  const { t } = useTranslation();
  const isGridView = useSelector(
    (state: RootState) => state.layout.clientsGrid
  );
  const expenseState = useSelector((state: RootState) => state.expense);
  const columns = expensesColumns(t);
  const { hasNextPage, ref, data, isPending, isRefetching } = useGetExpenses(
    expenseState.search_text
  );
  const expenses = data?.pages.flat();
  const dispatch = useDispatch();
  const rowClickHandler = (data: Expense) => {
    dispatch(setExpense({ ...data }));
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
          {expenses
            ? expenses.map((expense) => (
                <Grid key={expense.id} item xs={6}>
                  <ExpenseGridCard
                    expense={expense}
                    onClick={rowClickHandler}
                  />
                </Grid>
              ))
            : null}
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </Grid>
      ) : (
        <>
          <Table
            columns={columns}
            rows={expenses ? expenses : []}
            rowClickHandler={rowClickHandler}
          />
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </>
      )}
    </>
  );
};
