import { useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { useAddExpense } from "@myCash/hooks";
import { useTranslation } from "react-i18next";
import { MainIcon, SearchField } from "@myCash/common";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { EXPENSES_QUERY_KEY } from "@myCash/constants";
import { Add, Element3, Setting5 } from "iconsax-react";
import { AddExpenseForm, ExpensesFilterModal } from "@myCash/components";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import {
  RootState,
  changeClientsGrid,
  setExpensesSearchText,
} from "@myCash/lib";
import "./styles.scss";

interface ExpensesHeaderProps {}

export const ExpensesHeader: React.FC<ExpensesHeaderProps> = () => {
  const { t } = useTranslation();
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const layoutState = useSelector((state: RootState) => state.layout);
  const { mutate, isPending } = useAddExpense(() => setAddExpenseOpen(false));
  const queryClient = useQueryClient();
  const handleSearch = (value: string) => {
    dispatch(setExpensesSearchText(value));
  };
  return (
    <>
      <StyledHeaderStack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent="center"
        className="page-header"
      >
        <SearchField
          label={t("expenses.search")}
          disableBarcodeIcon
          handleSubmit={handleSearch}
        />
        <MainIcon
          icon={<Add size="32" color="#fff" />}
          bgColor="primary"
          iconcolor="white"
          onClick={() => setAddExpenseOpen(true)}
        />

        <MainIcon
          icon={<Setting5 variant="TwoTone" />}
          bgColor="grey"
          iconcolor="black"
          onClick={() => setFilterOpen(true)}
        />
        <MainIcon
          icon={<SlRefresh />}
          bgColor="grey"
          iconcolor="black"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
          }}
        />
        <MainIcon
          icon={<Element3 variant="Outline" />}
          bgColor={layoutState.clientsGrid ? "secondary" : "grey"}
          iconcolor={layoutState.clientsGrid ? "white" : "black"}
          onClick={() => {
            dispatch(changeClientsGrid());
          }}
        />
      </StyledHeaderStack>
      <AddExpenseForm
        open={addExpenseOpen}
        handleClose={() => setAddExpenseOpen(false)}
        buttonNames={{ action: "add" }}
        submitHandler={(values) => {
          mutate(values);
        }}
        isPending={isPending}
      />
      <ExpensesFilterModal
        open={filterOpen}
        handleClose={() => setFilterOpen(false)}
      />
    </>
  );
};
