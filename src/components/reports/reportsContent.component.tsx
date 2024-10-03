import { t } from "i18next";
import { AsideTitle, HeaderWithBack, ScrollContainer } from "@myCash/common";
import {
  ProductsReports,
  ReportsHeaderSection,
  SalesReports,
} from "@myCash/components";

import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

interface ReportsContentProps {}

export const ReportsContent: React.FC<ReportsContentProps> = () => {
  const navigate = useNavigate();
  return (
    <ScrollContainer>
      <HeaderWithBack title={t("reports.title")} hideBackButton />
      <ReportsHeaderSection />
      <SalesReports />
      <ProductsReports />
      <Stack className="sales-section-container">
        <AsideTitle
          title="reports.inventoryReports"
          showAll
          // amount="25"
          onClick={() => navigate("/reports/inventory-reports")}
        />
      </Stack>
    </ScrollContainer>
  );
};
