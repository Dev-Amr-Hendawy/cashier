import { useState } from "react";
import { useTranslation } from "react-i18next";
import { VscSettings } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { CommonModal, MainIcon } from "..";
import { useFilterItems } from "../../hooks";
import { productsActions } from "../../lib/store/slices/products-slice";
import { HomeFilterItems } from "../homeFIlterItems";
import { format } from "date-fns";

export const HomeFilterModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(productsActions.clearSorting());
    handleClose();
  };
  const handleConfirm = () => {
    handleClose();
  };
  const { t } = useTranslation();
  const { filterItems } = useFilterItems();
  // TODO::recheck
  const handleDateFrom = (date?: Date) => {
    if (!date ) {
      return dispatch(productsActions.setDateFrom(undefined));
    }
    const formattedDate = format(date, "yyyy-MM-dd");
    dispatch(productsActions.setDateFrom(formattedDate));
  };
  const handleDateTo = (date?: Date) => {
    if (!date ) {
      return dispatch(productsActions.setDateTo(undefined));
    }
    const formattedDate = format(date, "yyyy-MM-dd");
    dispatch(productsActions.setDateTo(formattedDate));
  };
  const handleSortClick = (index: number, id: number) => {
    dispatch(productsActions.clearSorting());
    if (index === 4) {
      dispatch(productsActions.setDiscountTypeSort(2));
      return;
    }
    if (index === 5) {
      dispatch(productsActions.setDiscountTypeSort(1));
      return;
    }
    dispatch(productsActions.setSort(id));
  };
  return (
    <>
      <MainIcon
        icon={<VscSettings />}
        bgColor="grey"
        iconcolor="common.black"
        onClick={handleOpen}
      />
      <CommonModal
        open={open}
        hasActions
        title={t("filter.title")}
        handleConfirm={handleConfirm}
        handleCancel={handleClose}
        handleBackBtn={handleCancel}
        handleClose={handleClose}
      >
        <HomeFilterItems
          items={filterItems}
          handleDateFrom={handleDateFrom}
          handleDateTo={handleDateTo}
          sortClickHandler={handleSortClick}
        />
      </CommonModal>
    </>
  );
};
