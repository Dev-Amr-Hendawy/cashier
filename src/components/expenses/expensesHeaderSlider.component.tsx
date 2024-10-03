import { FilterChipItem, MainIcon } from "@myCash/common";
import { RootState, setExpenseSlider, setExpenseSort } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";
import { ArrangeVertical } from "iconsax-react";
import { Stack } from "@mui/material";
import { StyledStack } from "@myCash/common/categorySection/styles";
import { useTranslation } from "react-i18next";

interface ExpensesHeaderSliderProps {}

export const ExpensessHeaderSlider: React.FC<
  ExpensesHeaderSliderProps
> = () => {
  const expensesState = useSelector((state: RootState) => state.expense);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <StyledStack direction="row" spacing={2} alignItems="center">
      <MainIcon
        icon={<ArrangeVertical />}
        bgColor={expensesState?.expense_sort === "1" ? "secondary" : "white"}
        iconcolor={expensesState?.expense_sort === "1" ? "white" : "black"}
        size="small"
        outlined={expensesState?.expense_sort !== "1"}
        onClick={() => {
          dispatch(
            setExpenseSort(expensesState.expense_sort === "1" ? "2" : "1")
          );
        }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: "0 1rem", width: "100%" }}
      >
        <FilterChipItem
          name={t("day")}
          id={0}
          handleClick={() => {
            dispatch(
              setExpenseSlider(expensesState.expense_slider !== "1" ? "1" : "")
            );
          }}
          selected={expensesState.expense_slider === "1" ? true : false}
        />
        <FilterChipItem
          name={t("byWeek")}
          id={1}
          fullWidth
          handleClick={() => {
            dispatch(
              setExpenseSlider(expensesState.expense_slider !== "2" ? "2" : "")
            );
          }}
          selected={expensesState.expense_slider === "2" ? true : false}
        />
        <FilterChipItem
          name={t("byMonth")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(
              setExpenseSlider(expensesState.expense_slider !== "3" ? "3" : "")
            );
          }}
          selected={expensesState.expense_slider === "3" ? true : false}
        />
        <FilterChipItem
          name={t("byYear")}
          id={3}
          fullWidth
          handleClick={() => {
            dispatch(
              setExpenseSlider(expensesState.expense_slider !== "4" ? "4" : "")
            );
          }}
          selected={expensesState.expense_slider === "4" ? true : false}
        />
      </Stack>
    </StyledStack>
  );
};
