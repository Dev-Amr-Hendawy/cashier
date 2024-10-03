import { FilterChipItem, MainIcon } from "@myCash/common";
import { RootState, setPaymentStatus, setReceiptSort } from "../../lib";
import { useDispatch, useSelector } from "react-redux";

import { ArrangeVertical } from "iconsax-react";
import { SORTING } from "@myCash/constants";
import { Stack } from "@mui/material";
import { StyledStack } from "@myCash/common/categorySection/styles";
import { useTranslation } from "react-i18next";

interface ClientsRecieptsSliderProps {}

export const ClientsRecieptsSlider: React.FC<
  ClientsRecieptsSliderProps
> = () => {
  const receiptState = useSelector((state: RootState) => state.receipt);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <StyledStack direction="row" spacing={2} alignItems="center">
      <MainIcon
        icon={<ArrangeVertical />}
        bgColor={
          receiptState?.filters.sort === SORTING.ASC ? "secondary" : "white"
        }
        iconcolor={
          receiptState?.filters.sort === SORTING.ASC ? "white" : "black"
        }
        size="small"
        outlined={receiptState?.filters.sort !== SORTING.ASC}
        onClick={() => {
          dispatch(
            setReceiptSort(
              receiptState.filters.sort === SORTING.ASC
                ? SORTING.DESC
                : SORTING.ASC
            )
          );
        }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: "0 1rem", width: "100%" }}
      >
        <FilterChipItem
          name={t("all")}
          id={0}
          handleClick={() => {
            dispatch(setPaymentStatus(""));
          }}
          selected={receiptState.filters.paymentStatus === "" ? true : false}
        />
        <FilterChipItem
          name={t("receipt.paid")}
          id={1}
          fullWidth
          handleClick={() => {
            dispatch(setPaymentStatus("1"));
          }}
          selected={receiptState.filters.paymentStatus === "1" ? true : false}
        />
        <FilterChipItem
          name={t("receipt.notPaid")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setPaymentStatus("2"));
          }}
          selected={receiptState.filters.paymentStatus === "2" ? true : false}
        />
      </Stack>
    </StyledStack>
  );
};
