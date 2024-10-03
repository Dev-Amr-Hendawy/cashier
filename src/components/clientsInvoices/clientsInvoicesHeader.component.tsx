import { MainIcon, SearchField } from "@myCash/common";

import { ClientInvoicesFilterModal } from "./clientInvoicesFilterModal.component";
import { INVOICES_QUERY_KEY } from "@myCash/constants";
import { Setting5 } from "iconsax-react";
import { SlRefresh } from "react-icons/sl";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import { setInvoicesSearchText } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import Button from "../form/Button";
import { ClientInvoicesResetModal } from "./clientInvoicesResetModal.component";
import { Box } from "@mui/material";
import repoIcon from "../../assets/icons/repo.svg";
import { useParams } from "react-router-dom";
interface ClientsInvoicesHeaderProps {}

export const ClientsInvoicesHeader: React.FC<
  ClientsInvoicesHeaderProps
> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };
  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };
  const { invoiceId } = useParams();
  const handleSearch = (value: string) => {
    dispatch(setInvoicesSearchText(value));
  };
  return (
    <>
      <StyledHeaderStack
        direction={"row"}
        gap={".5rem"}
        alignItems={"center"}
        justifyContent="center"
      >
        <SearchField
          handleSubmit={handleSearch}
          label={t("receipt.searchText")}
          value={invoiceId?invoiceId:null}

        />
        <MainIcon
          icon={<Setting5 variant="TwoTone" color="var(--primary-main)"  />}
          bgColor= "var(--background-color)"
          iconcolor="var(--primary-main)"
          shadow={'0px 0px 7.3px rgba(0, 0, 0, 0.25)'}
          onClick={handleOpenFilterModal}
        />
        <MainIcon
          icon={<SlRefresh />}
          bgColor= "var(--background-color)"
          iconcolor="var(--primary-main)"
          shadow={'0px 0px 7.3px rgba(0, 0, 0, 0.25)'}
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
          }}
        />
          <MainIcon
            icon={<Box component="img" src={repoIcon} alt="repo" />}
          bgColor= "var(--background-color)"
          iconcolor="var(--primary-main)"
          shadow={'0px 0px 7.3px rgba(0, 0, 0, 0.25)'}
          onClick={() => setOpenResetModal(true)}
        />
        {/* <Button
          text={t("invoice.resetInvoiceOrder")}
          color="primary"
          onClick={() => setOpenResetModal(true)}
          width="50%"
        /> */}
      </StyledHeaderStack>
      <ClientInvoicesFilterModal
        open={openFilterModal}
        handleClose={handleCloseFilterModal}
      />
      <ClientInvoicesResetModal
        open={openResetModal}
        handleClose={() => setOpenResetModal(false)}
      />
    </>
  );
};
