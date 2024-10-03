import { HeaderWithBack, NoData, ScrollContainer, Table } from "@myCash/common";
import { useNavigate } from "react-router-dom";
import {
  HeaderProductsCards,
  ReportsProductSettings,
  ReportsInventoryHeader,
  ReportInventoryTableResult,
} from "@myCash/components";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { inventoryReportsColumns } from "./columnStructure/columnStructure";
import { useCustomFilter, useGetReportsInventory } from "@myCash/hooks";
import { CircularProgress } from "@mui/material";
import { InventoryReport } from "@myCash/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInventoryReport } from "@myCash/lib";

interface ReportsInventoryContentProps {}

export const ReportsInventoryContent: React.FC<
  ReportsInventoryContentProps
> = () => {
  const [openResult, setOpenResult] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showReportData = (report: InventoryReport) => {
    dispatch(
      setInventoryReport({ ...report, finalPrice: report?.product?.finalPrice })
    );
    setOpenResult(true);
  };
  const productsColumns = inventoryReportsColumns(t, showReportData);
  const inventoryFilters = useCustomFilter({
    date_from: "",
    date_to: "",
    type: "",
    sort: "",
  });
  const { hasNextPage, ref, data, isPending, isRefetching } =
    useGetReportsInventory(inventoryFilters.filters);
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
        title={t("reports.inventoryReports")}
        handleClose={() => navigate("/reports")}
      />
      <HeaderProductsCards />
      <ReportsProductSettings />
      <ReportsInventoryHeader inventoryFilters={inventoryFilters} />
      {/* <ReportsInventorySlider inventoryFilters={inventoryFilters} /> */}
      {data?.pages[0].length === 0 ? (
        checkNoData()
      ) : (
        <>
          <Table columns={productsColumns} rows={reports ? reports : []} />
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </>
      )}
      <ReportInventoryTableResult
        open={openResult}
        handleClose={() => setOpenResult(false)}
      />
    </ScrollContainer>
  );
};
