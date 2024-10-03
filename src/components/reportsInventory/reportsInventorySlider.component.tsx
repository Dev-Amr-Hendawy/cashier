// import { t } from "i18next";
// import { Stack } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, setFilterSort, setReduxFilters } from "@myCash/lib";
// import { FilterChipItem, MainIcon } from "@myCash/common";
// import { ArrangeVertical } from "iconsax-react";

interface ReportsInventorySliderProps {}

export const ReportsInventorySlider: React.FC<
  ReportsInventorySliderProps
> = () => {
  // const dispatch = useDispatch();
  // const filterState = useSelector((state: RootState) => state.filter);
  return (
    // <MainLayout>
    // <Stack className="sales-reports-slider">
    //   <MainIcon
    //     icon={<ArrangeVertical />}
    //     bgColor={filterState?.sort === "1" ? "secondary" : "white"}
    //     iconcolor={filterState?.sort === "1" ? "white" : "black"}
    //     size="small"
    //     outlined={filterState?.sort !== "1"}
    //     onClick={() => {
    //       dispatch(setFilterSort(filterState.sort === "1" ? "2" : "1"));
    //     }}
    //   />
    //   <FilterChipItem
    //     name={t("day")}
    //     id={1}
    //     fullWidth
    //     handleClick={() => {
    //       dispatch(
    //         setReduxFilters({ type: filterState.type !== "1" ? "1" : "" })
    //       );
    //     }}
    //     selected={filterState.type === "1"}
    //   />
    //   <FilterChipItem
    //     name={t("byWeek")}
    //     id={2}
    //     fullWidth
    //     handleClick={() => {
    //       dispatch(
    //         setReduxFilters({ type: filterState.type !== "2" ? "2" : "" })
    //       );
    //     }}
    //     selected={filterState.type === "2"}
    //   />
    //   <FilterChipItem
    //     name={t("byMonth")}
    //     id={3}
    //     fullWidth
    //     handleClick={() => {
    //       dispatch(
    //         setReduxFilters({ type: filterState.type !== "3" ? "3" : "" })
    //       );
    //     }}
    //     selected={filterState.type === "3"}
    //   />
    //   <FilterChipItem
    //     name={t("byYear")}
    //     id={4}
    //     fullWidth
    //     handleClick={() => {
    //       dispatch(
    //         setReduxFilters({ type: filterState.type !== "4" ? "4" : "" })
    //       );
    //     }}
    //     selected={filterState.type === "4"}
    //   />
    // </Stack>
    <></>
    // </MainLayout>
  );
};
