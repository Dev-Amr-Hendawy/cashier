import { useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { MainIcon } from "@myCash/common";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import Button from "../form/Button";
import "./styles.scss";
import { useQueryClient } from "@tanstack/react-query";
import { REPORTS_SALES_QUERY_KEY } from "@myCash/constants";
import { Add } from "iconsax-react";
import { Stack } from "@mui/material";
import { DatePicker, ReportInventoryModal } from "@myCash/components";
import { FiltersHandlers } from "@myCash/types";
import { format } from "date-fns";

interface ReportsInventoryHeaderProps {
  inventoryFilters: FiltersHandlers<{
    date_from: string;
    date_to: string;
    type: string;
    sort: string;
  }>;
}

export const ReportsInventoryHeader: React.FC<ReportsInventoryHeaderProps> = ({
  inventoryFilters,
}) => {
  const { t } = useTranslation();
  const [addReportOpen, setAddReportOpen] = useState(false);
  const { filters, setFilterHandler, clearFilters } = inventoryFilters;
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
            disableFuture
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
        <Button
          text={t("reports.newReport")}
          startIcon={<Add size="32" color="#fff" />}
          onClick={() => setAddReportOpen(true)}
          width="40%"
        />

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
      </StyledHeaderStack>
      <ReportInventoryModal
        open={addReportOpen}
        handleClose={() => setAddReportOpen(false)}
      />
    </>
  );
};
