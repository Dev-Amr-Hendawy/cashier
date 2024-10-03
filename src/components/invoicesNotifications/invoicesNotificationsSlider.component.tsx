import { FilterChipItem, MainIcon } from "@myCash/common";
import {
  RootState,
  setInvoicesNotificationsSort,
  setInvoicesNotificationsType,
} from "../../lib";
import { useDispatch, useSelector } from "react-redux";

import { ArrangeVertical } from "iconsax-react";
import { SORTING } from "@myCash/constants";
import { Stack } from "@mui/material";
import { StyledStack } from "@myCash/common/categorySection/styles";
import { useTranslation } from "react-i18next";

interface ClientsInvoicesSliderProps {}

export const InvoicesNotificationsSlider: React.FC<
  ClientsInvoicesSliderProps
> = () => {
  const invoicesState = useSelector(
    (state: RootState) => state.invoicesNotifications
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <StyledStack direction="row" spacing={2} alignItems="center">
      <MainIcon
        icon={<ArrangeVertical />}
        bgColor={
          invoicesState?.filters.sort === SORTING.ASC ? "secondary" : "white"
        }
        iconcolor={
          invoicesState?.filters.sort === SORTING.ASC ? "white" : "black"
        }
        size="small"
        outlined={invoicesState?.filters.sort !== SORTING.ASC}
        onClick={() => {
          dispatch(
            setInvoicesNotificationsSort(
              invoicesState.filters.sort === SORTING.ASC
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
            dispatch(setInvoicesNotificationsType(""));
          }}
          selected={invoicesState.filters.type === "" ? true : false}
        />
        <FilterChipItem
          name={t("creditorInvoice")}
          id={1}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesNotificationsType("1"));
          }}
          selected={invoicesState.filters.type === "1" ? true : false}
        />
        <FilterChipItem
          name={t("debtorInvoice")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesNotificationsType("2"));
          }}
          selected={invoicesState.filters.type === "2" ? true : false}
        />
      </Stack>
    </StyledStack>
  );
};
