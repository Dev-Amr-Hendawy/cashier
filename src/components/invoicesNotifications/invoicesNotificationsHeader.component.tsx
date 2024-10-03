import { MainIcon, SearchField } from "@myCash/common";

import { INVOICES_NOTIFICATIONS_QUERY_KEY } from "@myCash/constants";
import { InvoicesNotificationsFilterModal } from "./invoicesNotificationsFilterModal.component";
import { Setting5 } from "iconsax-react";
import { SlRefresh } from "react-icons/sl";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import { setInvoicesNotificationsSearchText } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ClientsInvoicesHeaderProps {}

export const InvoicesNotificationsHeader: React.FC<
  ClientsInvoicesHeaderProps
> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };
  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };

  const handleSearch = (value: string) => {
    dispatch(setInvoicesNotificationsSearchText(value));
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
        />
        <MainIcon
          icon={<Setting5 variant="TwoTone" />}
          bgColor="grey"
          iconcolor="black"
          onClick={handleOpenFilterModal}
        />
        <MainIcon
          icon={<SlRefresh />}
          bgColor="grey"
          iconcolor="black"
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: [INVOICES_NOTIFICATIONS_QUERY_KEY],
            });
          }}
        />
      </StyledHeaderStack>
      <InvoicesNotificationsFilterModal
        open={openFilterModal}
        handleClose={handleCloseFilterModal}
      />
    </>
  );
};
