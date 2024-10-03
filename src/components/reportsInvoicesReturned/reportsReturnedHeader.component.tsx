import { Stack } from "@mui/material";
import { MainIcon, SelectBranch } from "@myCash/common";
import { SlRefresh } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { REPORTS_SELL_QUERY_KEY } from "@myCash/constants";
import { useQueryClient } from "@tanstack/react-query";

import { DatePicker } from "../form";
import Button from "../form/Button";
// import { SearchNormal, Setting5 } from "iconsax-react";
import { useDatePickerHandler, 
  // useModalHandler
 } from "@myCash/hooks";
// import { ReportsReturnedFilter } from "./reportsReturnedFilter.component";

interface ReportsReturnedHeaderProps {
  setDateFilters: (filters: { date_from?: string; date_to?: string }) => void;
  resetParentFilters: () => void;
  setReturnedFilters: (key:string,value: string) => void;
  ReturnedFilters?:{invoiceType: string;
     branch_id: string}
}

export const ReportsReturnedHeader: React.FC<ReportsReturnedHeaderProps> = ({
  setDateFilters,ReturnedFilters,
  resetParentFilters,
  setReturnedFilters,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { filters, handleDateFrom, handleDateTo, handleResetDateFilters } =
    useDatePickerHandler();
  // const { handleCloseFilterModal, 
  //   // handleOpenFilterModal, 
  //   openFilterModal } =
  //   useModalHandler();
  return (
    <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"} p={"1rem"} sx={{".filters-branch":
      {
        minWidth:"10rem"
      }
    }}>
      <SelectBranch setFilterHandler={setReturnedFilters} branchId={ReturnedFilters?.branch_id}  />
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
        text={t("apply")}
       
        onClick={() => setDateFilters(filters)}
        width="30%"
      />
      {/* <MainIcon
        icon={<Setting5 variant="TwoTone" />}
        bgColor="grey"
        iconcolor="black"
        onClick={handleOpenFilterModal}
      /> */}
      <MainIcon
        icon={<SlRefresh />}
        bgColor="grey"
        iconcolor="primary"
        onClick={() => {
          handleResetDateFilters();
          resetParentFilters();
          setReturnedFilters("branch_id",""); setReturnedFilters("invoiceType","");
          queryClient.invalidateQueries({ queryKey: [REPORTS_SELL_QUERY_KEY] });
        }}
      />
      {/* <ReportsReturnedFilter
        handleCancelFilters={() => {
          setReturnedFilters("branch_id",""); setReturnedFilters("invoiceType","");
          handleCloseFilterModal();
        }}
        handleClose={handleCloseFilterModal}
        handleConfirmFilters={setReturnedFilters}
        hasActions
        open={openFilterModal}
        title={t("filter.title")}
      /> */}
    </Stack>
  );
};
