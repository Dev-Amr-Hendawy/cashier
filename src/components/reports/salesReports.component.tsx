import { Stack } from "@mui/material";
import { AsideTitle, MainLayout, ReportSalesCard } from "@myCash/common";
import { Card, Chart, EmptyWalletTime, WalletMoney } from "iconsax-react";
import { useNavigate } from "react-router-dom";

interface SalesReportsProps {}

export const SalesReports: React.FC<SalesReportsProps> = () => {
  const navigate = useNavigate();
  return (
    <Stack className="sales-section-container">
      <AsideTitle
        title="reports.salesReports"
        showAll
        // amount="25"
        onClick={() => navigate("/reports/sales-reports")}
      />
      <MainLayout>
        <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
          <ReportSalesCard
            appendix="today"
            icon={<Chart color="var(--secondary-main)" />}
            title="reports.totalSales"
            value="3000"
          />
          <ReportSalesCard
            appendix="today"
            icon={<WalletMoney color="var(--secondary-main)" />}
            title="reports.totalCash"
            value="3000"
          />
          <ReportSalesCard
            appendix="today"
            icon={<Card color="var(--secondary-main)" />}
            title="reports.totalVisa"
            value="3000"
          />
          <ReportSalesCard
            appendix="today"
            icon={<EmptyWalletTime color="var(--secondary-main)" />}
            title="reports.totalCredit"
            value="3000"
          />
        </Stack>
      </MainLayout>
    </Stack>
  );
};
