import "./styles.scss";

import { Add, Element3, Setting5 } from "iconsax-react";
import { AddClientContent, FilterModal } from "..";
import { MainIcon, SearchField } from "@myCash/common";
import {
  RootState,
  changeClientsGrid,
  resetClientsFilter,
  setClientsSearchText,
} from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import Button from "../form/Button";
import { CLIENTS_QUERY_KEY } from "@myCash/constants";
import { SlRefresh } from "react-icons/sl";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ClientsHeaderProps {}

export const ClientsHeader: React.FC<ClientsHeaderProps> = () => {
  const { t } = useTranslation();
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const cartState = useSelector((state: RootState) => state.cart);
  const layoutState = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleSearch = (value: string) => {
    dispatch(setClientsSearchText(value));
  };

  return (
    <>
      <StyledHeaderStack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent="center"
        className="clients-header"
      >
        <SearchField handleSubmit={handleSearch} label="client.clientSearch" />
        <Button
          text={t("client.newClient")}
          startIcon={<Add size="32" color="#fff" />}
          onClick={() => setAddClientOpen(true)}
          width="35%"
        />

        <MainIcon
          icon={<Setting5 variant="TwoTone" />}
          bgColor="grey"
          iconcolor="common.black"
          onClick={() => setFilterOpen(true)}
        />
        <MainIcon
          icon={<SlRefresh />}
          bgColor="grey"
          iconcolor="common.black"
          onClick={() => {
            dispatch(resetClientsFilter());
            queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] });
          }}
        />
        <MainIcon
          icon={<Element3 variant="Outline" />}
          bgColor={layoutState.clientsGrid ? "secondary" : "grey"}
          iconcolor={layoutState.clientsGrid ? "common.white" : "common.black"}
          onClick={() => {
            dispatch(changeClientsGrid());
          }}
        />
      </StyledHeaderStack>
      <AddClientContent
        open={addClientOpen}
        cartState={cartState}
        t={t}
        handleClose={() => setAddClientOpen(false)}
        hideButtonHandler
        buttonsNames={{ action: "add" }}
        // notAutoComplete={true}
      />
      <FilterModal open={filterOpen} handleClose={() => setFilterOpen(false)} />
    </>
  );
};
