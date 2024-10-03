import { MainIcon, SearchField } from "@myCash/common";
import {
  RootState,
  closeReceiptFilterModal,
  openReceiptFilterModal,
  setReceiptsSearchText,
} from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { RECEIPTS_QUERY_KEY } from "@myCash/constants";
import { ReceiptFilterModal } from ".";
import { Setting5 } from "iconsax-react";
import { SlRefresh } from "react-icons/sl";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface ClientsRecieptsHeaderProps {}

export const ClientsRecieptsHeader: React.FC<
  ClientsRecieptsHeaderProps
> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const receiptState = useSelector((state: RootState) => state.receipt);
  const handleOpenFilterModal = () => {
    dispatch(openReceiptFilterModal());
  };
  const handleCloseFilterModal = () => {
    dispatch(closeReceiptFilterModal());
  };

  const handleSearch = (value: string) => {
    dispatch(setReceiptsSearchText(value));
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
            queryClient.invalidateQueries({ queryKey: [RECEIPTS_QUERY_KEY] });
          }}
        />
      </StyledHeaderStack>
      <ReceiptFilterModal
        open={receiptState.openFilterModal}
        handleClose={handleCloseFilterModal}
      />
    </>
  );
};
