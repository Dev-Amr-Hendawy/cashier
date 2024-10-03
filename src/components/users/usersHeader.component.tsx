import { useState } from "react";
import { useDispatch } from "react-redux";
import { SlRefresh } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { changeClientsGrid, setEmployeeSearchText } from "@myCash/lib";
import { MainIcon, SearchField } from "@myCash/common";
import { Add, Element3, Setting5 } from "iconsax-react";
import { AddUserForm, UsersFilterModal } from "@myCash/components";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import Button from "../form/Button";
import "./styles.scss";
import { useAddEmployee } from "@myCash/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { EMPLOYEES_QUERY_KEY } from "@myCash/constants";
import { FiltersHandlers } from "@myCash/types";

interface UsersHeaderProps {
  usersFilters: FiltersHandlers<{
    branch_id: string;
    date_from: string;
    date_to: string;
  }>;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({ usersFilters }) => {
  const { t } = useTranslation();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess } = useAddEmployee(() =>
    setAddUserOpen(false)
  );
  const handleSearch = (value: string) => {
    dispatch(setEmployeeSearchText(value));
  };
  const queryClient = useQueryClient();
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
          label={t("users.search")}
          disableBarcodeIcon
          handleSubmit={handleSearch}
        />
        <Button
          text={t("users.newUser")}
          startIcon={<Add size="32" color="#fff" />}
          onClick={() => setAddUserOpen(true)}
          width="40%"
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
            usersFilters.clearFilters();
            queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
          }}
        />
        <MainIcon
          icon={<Element3 variant="Outline" />}
          bgColor="secondary"
          iconcolor="white"
          onClick={() => {
            dispatch(changeClientsGrid());
          }}
        />
      </StyledHeaderStack>
      <AddUserForm
        open={addUserOpen}
        handleClose={() => setAddUserOpen(false)}
        buttonNames={{ action: "add" }}
        submitHandler={(values) => {
          mutate(values);
        }}
        isPending={isPending}
        isSuccess={isSuccess}
      />
      <UsersFilterModal
        open={filterOpen}
        handleClose={() => setFilterOpen(false)}
        usersFilters={usersFilters}
      />
    </>
  );
};
