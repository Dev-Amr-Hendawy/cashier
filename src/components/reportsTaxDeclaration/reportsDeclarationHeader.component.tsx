import { Stack } from "@mui/material";
import { MainIcon } from "@myCash/common";
import { SlRefresh } from "react-icons/sl";
import { SearchNormal } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useDatePickerHandler } from "@myCash/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { REPORTS_TAX_DECLARATION_QUERY_KEY } from "@myCash/constants";

import Button from "../form/Button";

import { DatePicker } from "../form";
import "./styles.scss";
interface ReportsDeclarationHeaderProps {
  setDateFilters: (filters: { date_from?: string; date_to?: string }) => void;
  resetParentFilters: () => void;
}

export const ReportsDeclarationHeader: React.FC<
  ReportsDeclarationHeaderProps
> = ({ setDateFilters, resetParentFilters }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { filters, handleDateFrom, handleDateTo, handleResetDateFilters } =
    useDatePickerHandler();

  return (
    <Stack
      direction={"row"}
      gap={"0.5rem"}
      alignItems={"center"}
      p={"1rem"}
      className="declaration-tax-header"
    >
      <Stack direction="row" spacing={1.5} flex={6}>
        <DatePicker
          onChange={handleDateFrom}
          title={t("from")}
          value={filters.date_from ? new Date(filters.date_from) : undefined}
          fullWidth
        />
        <DatePicker
          onChange={handleDateTo}
          title={t("to")}
          value={filters.date_to ? new Date(filters.date_to) : undefined}
          fullWidth
        />
      </Stack>
      <Button
        text={t("nativeSearch")}
        startIcon={<SearchNormal size="24" color="#fff" />}
        onClick={() => setDateFilters(filters)}
        width="10%"
      />
      <MainIcon
        icon={<SlRefresh />}
        bgColor="grey"
        iconcolor="common.black"
        onClick={() => {
          handleResetDateFilters();
          resetParentFilters();
          queryClient.invalidateQueries({
            queryKey: [REPORTS_TAX_DECLARATION_QUERY_KEY],
          });
        }}
      />
    </Stack>
  );
};
