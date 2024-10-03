import { HeaderWithBack, NoData, ScrollContainer, Table } from "@myCash/common";
import { useNavigate } from "react-router-dom";
import {
  HeaderProductsCards,
  ReportsProductSettings,
  ReportsProductsHeader,
  ReportsProductSlider,
  ReportTableResult,
} from "@myCash/components";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { productsReportsColumns } from "./columnStructure/columnStructure";
import { useCustomFilter, useGetReportsProducts } from "@myCash/hooks";
import { CircularProgress } from "@mui/material";
import { ProductReport } from "@myCash/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProductReport } from "@myCash/lib";
interface ReportsProductsContentProps {}

export const ReportsProductsContent: React.FC<
  ReportsProductsContentProps
> = () => {
  const [openResult, setOpenResult] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showReportData = (report: ProductReport) => {
    dispatch(setProductReport(report));
    setOpenResult(true);
  };
  const productsColumns = productsReportsColumns(t, showReportData);
  const productsFilters = useCustomFilter({
    date_from: "",
    date_to: "",
    type: "",
    sort: "",
  });

  const { hasNextPage, ref, data, isPending, isRefetching } =
    useGetReportsProducts(productsFilters.filters);
  const reports = data?.pages.flat();
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
        title={t("reports.productsReports")}
        handleClose={() => navigate("/reports")}
      />
      <HeaderProductsCards />
      <ReportsProductSettings />
      <ReportsProductsHeader productsFilters={productsFilters} />
      <ReportsProductSlider productsFilters={productsFilters} />
      {data?.pages[0].length === 0 ? (
        checkNoData()
      ) : (
        <>
          <Table columns={productsColumns} rows={reports ? reports : []} />
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </>
      )}
      <ReportTableResult
        open={openResult}
        handleClose={() => setOpenResult(false)}
      />
    </ScrollContainer>
  );
};
