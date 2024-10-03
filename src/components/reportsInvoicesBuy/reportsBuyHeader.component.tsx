import { Stack } from "@mui/material";
import { MainIcon } from "@myCash/common";
import { SlRefresh } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { REPORTS_BUY_QUERY_KEY } from "@myCash/constants";
import { useQueryClient } from "@tanstack/react-query";

import { DatePicker } from "../form";
import Button from "../form/Button";
import { SearchNormal, Setting5 } from "iconsax-react";
import { useDatePickerHandler, useModalHandler } from "@myCash/hooks";
import { ReportsBuyFilter } from "./reportsBuyFilter.component";

interface ReportsBuyHeaderProps {
  setDateFilters: (filters: { date_from?: string; date_to?: string }) => void;
  resetParentFilters: () => void;
  setBuyFilters: (value: string) => void;
}

export const ReportsBuyHeader: React.FC<ReportsBuyHeaderProps> = ({
  setDateFilters,
  resetParentFilters,
  setBuyFilters,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { filters, handleDateFrom, handleDateTo, handleResetDateFilters } =
    useDatePickerHandler();
  const { handleCloseFilterModal, handleOpenFilterModal, openFilterModal } =
    useModalHandler();
  return (
    <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"} p={"1rem"}>
      <Stack direction="row" justifyContent="space-between" spacing={1.5}>
        <DatePicker
          onChange={handleDateFrom}
          title={t("from")}
          value={filters.date_from ? new Date(filters.date_from) : undefined}
        />
        <DatePicker
          onChange={handleDateTo}
          title={t("to")}
          value={filters.date_to ? new Date(filters.date_to) : undefined}
        />
      </Stack>
      <Button
        text={t("nativeSearch")}
        startIcon={<SearchNormal size="24" color="#fff" />}
        onClick={() => setDateFilters(filters)}
        width="25%"
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
        iconcolor="common.black"
        onClick={() => {
          handleResetDateFilters();
          setBuyFilters("");
          resetParentFilters();
          queryClient.invalidateQueries({ queryKey: [REPORTS_BUY_QUERY_KEY] });
        }}
      />
      <ReportsBuyFilter
        handleCancelFilters={() => {
          setBuyFilters("");
          handleCloseFilterModal();
        }}
        handleClose={handleCloseFilterModal}
        handleConfirmFilters={setBuyFilters}
        hasActions
        open={openFilterModal}
        title={t("filter.title")}
      />
    </Stack>
  );
};
