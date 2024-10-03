import { Stack } from "@mui/material";
import { MainIcon } from "@myCash/common";
import { SlRefresh } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { CLIENTS_QUERY_KEY } from "@myCash/constants";
import { useQueryClient } from "@tanstack/react-query";

import { DatePicker } from "../form";
import Button from "../form/Button";
import { SearchNormal } from "iconsax-react";
import { useDatePickerHandler } from "@myCash/hooks";

interface ReportsExpensesHeaderProps {
  setDateFilters: (filters: { date_from?: string; date_to?: string }) => void;
  resetParentFilters: () => void;
}

export const ReportsExpensesHeader: React.FC<ReportsExpensesHeaderProps> = ({
  setDateFilters,
  resetParentFilters,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { filters, handleDateFrom, handleDateTo, handleResetDateFilters } =
    useDatePickerHandler();
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
        icon={<SlRefresh />}
        bgColor="grey"
        iconcolor="common.black"
        onClick={() => {
          handleResetDateFilters();
          resetParentFilters();
          queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] });
        }}
      />
    </Stack>
  );
};
