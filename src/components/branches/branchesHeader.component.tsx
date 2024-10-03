import { MainIcon, SearchField } from "@myCash/common";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import {
  //  AddBranchForm, 
  BranchesFilterModal } from "@myCash/components";
import { changeClientsGrid, setBranchSearchText } from "@myCash/lib";
import {
  //  Add, 
  Element3, Setting5 } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SlRefresh } from "react-icons/sl";
import { useDispatch } from "react-redux";
import "./styles.scss";
// import Button from "../form/Button";
// import { useAddBranch } from "@myCash/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { BRANCHES_QUERY_KEY } from "@myCash/constants";
import { FiltersHandlers } from "@myCash/types";

interface BranchesHeaderProps {
  branchesFilters: FiltersHandlers<{
    date_from: string;
    date_to: string;
    status: string;
    city: string;
  }>;
}

export const BranchesHeader: React.FC<BranchesHeaderProps> = ({
  branchesFilters,
}) => {
  const { t } = useTranslation();
  // const [addBranchOpen, setAddBranchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();
  // const { mutate, isPending } = useAddBranch(() => setAddBranchOpen(false));
  const queryClient = useQueryClient();
  const handleSearch = (value: string) => {
    dispatch(setBranchSearchText(value));
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
          label={t("branches.search")}
          disableBarcodeIcon
          handleSubmit={handleSearch}
        />
        {/* <Button
          text={t("branches.newBranch")}
          startIcon={<Add size="32" color="#fff" />}
          onClick={() => setAddBranchOpen(true)}
          width="40%"
        /> */}

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
            branchesFilters.clearFilters();
            queryClient.invalidateQueries({ queryKey: [BRANCHES_QUERY_KEY] });
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
      {/* <AddBranchForm
        open={addBranchOpen}
        handleClose={() => setAddBranchOpen(false)}
        buttonNames={{ action: "add" }}
        submitHandler={(values) => {
          mutate(values);
        }}
        isPending={isPending}
      /> */}
      <BranchesFilterModal
        open={filterOpen}
        handleClose={() => setFilterOpen(false)}
        branchesFilters={branchesFilters}
      />
    </>
  );
};
