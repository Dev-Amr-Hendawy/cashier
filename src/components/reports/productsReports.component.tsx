import { Stack } from "@mui/material";
import { AsideTitle, MainLayout, ReportsProductCard } from "@myCash/common";
import { Bag } from "iconsax-react";
import { ProductsReportsSlider } from "./productsReportsSlider.component";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useCustomFilter } from "@myCash/hooks";

interface ProductsReportsProps {}

export const ProductsReports: React.FC<ProductsReportsProps> = () => {
  const navigate = useNavigate();
  const productsFilters = useCustomFilter({
    type: "",
  });
  const { type } = productsFilters.filters;
  const filterDate =
    type === "1"
      ? "day"
      : type === "2"
      ? "byWeek"
      : type === "3"
      ? "byMonth"
      : type === "4"
      ? "byYear"
      : "day";
  return (
    <Stack className="sales-section-container">
      <AsideTitle
        title="reports.productsReports"
        showAll
        // amount="25"
        onClick={() => navigate("/reports/products-reports")}
      />
      <ProductsReportsSlider productsFilters={productsFilters} />
      <MainLayout>
        <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
          <ReportsProductCard
            date={t(filterDate)}
            icon={<Bag color="var(--secondary-main)" />}
            title="reports.productCards.totalProducts"
            value="40"
          />
          <ReportsProductCard
            date={t(filterDate)}
            icon={<Bag color="var(--secondary-main)" />}
            title="reports.productCards.recentlyAdded"
            value="40"
          />
          <ReportsProductCard
            date={t(filterDate)}
            icon={<Bag color="var(--secondary-main)" />}
            title="reports.productCards.sold"
            value="40"
          />
          <ReportsProductCard
            date={t(filterDate)}
            icon={<Bag color="var(--secondary-main)" />}
            title="reports.productCards.returned"
            value="40"
          />
        </Stack>
      </MainLayout>
    </Stack>
  );
};
