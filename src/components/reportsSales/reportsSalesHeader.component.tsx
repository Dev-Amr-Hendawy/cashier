// import { useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { MainIcon } from "@myCash/common";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
// import Button from "../form/Button";
import "./styles.scss";
import { useQueryClient } from "@tanstack/react-query";
import { REPORTS_SALES_QUERY_KEY } from "@myCash/constants";
// import { Add } from "iconsax-react";
import { Stack } from "@mui/material";
import { DatePicker } from "../form";
import { format } from "date-fns";
// import { ReportAddForm } from "./reportAddForm.component";
import { FiltersHandlers } from "@myCash/types";

interface ReportsSalesHeaderProps {
  salesFilters: FiltersHandlers<{
    date_to: string;
    date_from: string;
    type: string;
    sort: string;
    branch_id: string;
  }>;
}

export const ReportsSalesHeader: React.FC<ReportsSalesHeaderProps> = ({
  salesFilters,
}) => {
  const { t } = useTranslation();
  // const [addReportOpen, setAddReportOpen] = useState(false);
  const { filters, setFilterHandler } = salesFilters;
 
  const {clearFilters } = salesFilters;
  const queryClient = useQueryClient();

  return (
    <>
      <StyledHeaderStack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent="center"
        className="page-header"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1.5}
          className="reports-dates-container"
        >
          <DatePicker
            value={filters.date_from ? new Date(filters.date_from) : undefined}
            onChange={(date) =>
              setFilterHandler({
                date_from: date ? format(date, "yyyy-MM-dd") : "",
              })
            }
            title={t("dateFrom")}
          />
          <DatePicker
            value={filters.date_to ? new Date(filters.date_to) : undefined}
            onChange={(date) =>
              setFilterHandler({
                date_to: date ? format(date, "yyyy-MM-dd") : "",
              })
            }
            disableFuture
            title={t("to")}
          />
        </Stack>
        <MainIcon
          icon={<SlRefresh />}
          bgColor="grey"
          iconcolor="black"
          onClick={() => {
            clearFilters();
            queryClient.invalidateQueries({
              queryKey: [REPORTS_SALES_QUERY_KEY],
            });
          }}
        />
        {/* <Button
          text={t("reports.newReport")}
          startIcon={<Add size="32" color="#fff" />}
          onClick={() => setAddReportOpen(true)}
          width="40%"
        /> */}

       
      </StyledHeaderStack>
      {/* <ReportAddForm
        open={addReportOpen}
        handleClose={() => setAddReportOpen(false)}
      /> */}
    </>
  );
};
