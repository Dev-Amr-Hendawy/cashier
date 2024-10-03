import { FilterChipItem, MainIcon } from "@myCash/common";
import { RootState, setClientSort, setClientType } from "../../lib";
import { useDispatch, useSelector } from "react-redux";

import { ArrangeVertical } from "iconsax-react";
import { Stack } from "@mui/material";
import { StyledStack } from "@myCash/common/categorySection/styles";
import { useTranslation } from "react-i18next";

interface ClientHeaderSliderProps {}

export const ClientsHeaderSlider: React.FC<ClientHeaderSliderProps> = () => {
  const clientState = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <StyledStack direction="row" spacing={2} alignItems="center">
      <MainIcon
        icon={<ArrangeVertical />}
        bgColor={clientState?.client_sort === "1" ? "secondary" : "white"}
        iconcolor={clientState?.client_sort === "1" ? "white" : "black"}
        size="small"
        outlined={clientState?.client_sort !== "1"}
        onClick={() => {
          dispatch(setClientSort(clientState.client_sort === "1" ? "2" : "1"));
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
            dispatch(setClientType(""));
          }}
          selected={clientState.type === "" ? true : false}
        />
        <FilterChipItem
          name={t("clients")}
          id={1}
          fullWidth
          handleClick={() => {
            dispatch(setClientType("1"));
          }}
          selected={clientState.type === "1" ? true : false}
        />
        <FilterChipItem
          name={t("vendors")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setClientType("2"));
          }}
          selected={clientState.type === "2" ? true : false}
        />
      </Stack>
    </StyledStack>
  );
};
