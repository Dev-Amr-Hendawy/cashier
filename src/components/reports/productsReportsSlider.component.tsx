import { t } from "i18next";
import { Stack } from "@mui/material";
import { FilterChipItem, MainLayout } from "@myCash/common";
import { FiltersHandlers } from "@myCash/types";

interface ProductsReportsProps {
  productsFilters: FiltersHandlers<{
    type: string;
  }>;
}

export const ProductsReportsSlider: React.FC<ProductsReportsProps> = ({
  productsFilters,
}) => {
  const { filters, setFilterHandler } = productsFilters;
  return (
    <MainLayout>
      <Stack className="products-reports-slider">
        <FilterChipItem
          name={t("day")}
          id={1}
          fullWidth
          handleClick={() => {
            setFilterHandler({ type: "1" });
          }}
          selected={filters.type === "1"}
        />
        <FilterChipItem
          name={t("byWeek")}
          id={2}
          fullWidth
          handleClick={() => {
            setFilterHandler({ type: "2" });
          }}
          selected={filters.type === "2"}
        />
        <FilterChipItem
          name={t("byMonth")}
          id={3}
          fullWidth
          handleClick={() => {
            setFilterHandler({ type: "3" });
          }}
          selected={filters.type === "3"}
        />
        <FilterChipItem
          name={t("byYear")}
          id={4}
          fullWidth
          handleClick={() => {
            setFilterHandler({ type: "4" });
          }}
          selected={filters.type === "4"}
        />
      </Stack>
    </MainLayout>
  );
};
