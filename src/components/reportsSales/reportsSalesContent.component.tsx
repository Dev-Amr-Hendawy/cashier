import { HeaderWithBack, NoData, ScrollContainer, Table } from "@myCash/common";
import { useNavigate } from "react-router-dom";
import {
  HeaderSalesCards,
  ReportsSalesHeader,
  // ReportsSalesSettings,
  ReportsSalesSlider,
} from "@myCash/components";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { salesReportsColumns } from "./columnStructure/columnStructure";
import { useCustomFilter, useGetReportsSales } from "@myCash/hooks";
import { CircularProgress, Stack } from "@mui/material";
import { ReportsSalesFilterSettings } from "./reportsSalesFilterSettings.component";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { REPORTS_SALES_QUERY_KEY } from "@myCash/constants";
import { SalesReport } from "@myCash/types";
interface ReportsSalesContentProps { }

export const ReportsSalesContent: React.FC<ReportsSalesContentProps> = () => {
  const [selectedValue, setSelectedValue] = useState('date');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const salesColumns = salesReportsColumns(t);
  const salesFilters = useCustomFilter({
    date_from: "",
    date_to: "",
    type: "",
    sort: "",
    branch_id:"",
  });
  const { hasNextPage, ref, data, isPending, isRefetching } =
    useGetReportsSales(salesFilters.filters);
  
  const reports = data?.pages?.flat()?.map((report,index)=>({id:index,...report})); 
  const {clearFilters } = salesFilters;
  const queryClient = useQueryClient();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    (() => {
      clearFilters();
      queryClient.invalidateQueries({
        queryKey: [REPORTS_SALES_QUERY_KEY],
      });
    })();
  };



  const rowClickHandler = (data: SalesReport) => {
    if (!data?.start_date && !data?.end_date) return;
    const formattedstart_date = data?.start_date?.split(" ")?.[0]?.replace(/\//g, "-");
    const formattedend_date = data?.end_date?.split(" ")?.[0]?.replace(/\//g, "-");
    navigate(`/reports/invoices/sell-reports/${formattedstart_date}/${formattedend_date}/${salesFilters.filters.branch_id}`);
  };
  
  
  const checkNoData = () => {
    if (
      !data?.pages[0] ||
      (data?.pages[0].length === 0 && !isPending && !isRefetching)
    )
      return <NoData />;
  };

  return (
    <ScrollContainer>
      <HeaderWithBack
        title={t("reports.salesReports")}
        handleClose={() => navigate("/reports")}
      />
      <HeaderSalesCards   branch_id={ salesFilters?.filters?.branch_id  }/>
      {/* <ReportsSalesSettings /> */}
      <ReportsSalesFilterSettings selectedValue={selectedValue} salesFilters={salesFilters} 
        handleChange={handleChange} />
      {selectedValue === "date" && <ReportsSalesHeader salesFilters={salesFilters} />}
      {selectedValue === "time-period" && <ReportsSalesSlider salesFilters={salesFilters} />}
      {data?.pages[0].length === 0 ? (
        checkNoData()
      ) : (
        <Stack className="report">
          <Table columns={salesColumns} rows={reports ? reports : []}
              rowClickHandler={(data: SalesReport ) => rowClickHandler(data)}
           />
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </Stack>
      )}
    </ScrollContainer>
  );
};
