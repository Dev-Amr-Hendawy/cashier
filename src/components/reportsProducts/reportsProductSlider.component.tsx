import { t } from "i18next";
import { Stack } from "@mui/material";
import { FilterChipItem, MainIcon } from "@myCash/common";
import { ArrangeVertical } from "iconsax-react";
import { FiltersHandlers } from "@myCash/types";

interface ReportsProductSliderProps {
  productsFilters: FiltersHandlers<{
    date_from: string;
    date_to: string;
    type: string;
    sort: string;
  }>;
}

export const ReportsProductSlider: React.FC<ReportsProductSliderProps> = ({
  productsFilters,
}) => {
  const { filters, setFilterHandler } = productsFilters;
  return (
    // <MainLayout>
    <Stack className="sales-reports-slider">
      <MainIcon
        icon={<ArrangeVertical />}
        bgColor={filters.sort === "1" ? "secondary" : "white"}
        iconcolor={filters.sort === "1" ? "white" : "black"}
        size="small"
        outlined={filters.sort !== "1"}
        onClick={() => {
          setFilterHandler({ sort: filters.sort === "1" ? "2" : "1" });
        }}
      />
      <FilterChipItem
        name={t("day")}
        id={1}
        fullWidth
        handleClick={() => {
          setFilterHandler({ type: filters.type !== "1" ? "1" : "" });
        }}
        selected={filters.type === "1"}
      />
      <FilterChipItem
        name={t("byWeek")}
        id={2}
        fullWidth
        handleClick={() => {
          setFilterHandler({ type: filters.type !== "2" ? "2" : "" });
        }}
        selected={filters.type === "2"}
      />
      <FilterChipItem
        name={t("byMonth")}
        id={3}
        fullWidth
        handleClick={() => {
          setFilterHandler({ type: filters.type !== "3" ? "3" : "" });
        }}
        selected={filters.type === "3"}
      />
      <FilterChipItem
        name={t("byYear")}
        id={4}
        fullWidth
        handleClick={() => {
          setFilterHandler({ type: filters.type !== "4" ? "4" : "" });
        }}
        selected={filters.type === "4"}
      />
    </Stack>
    // </MainLayout>
  );
};
