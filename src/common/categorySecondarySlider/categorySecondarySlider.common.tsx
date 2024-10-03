import { Collapse, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { CategoryChipSecondary } from "..";
import { getSingleCategory } from "../../apis";
import { SINGLE_CATEGORY_QUERY_KEY } from "../../constants";
import { RootState } from "../../lib";
import { Category } from "../../types/types";
import { CategorySecondarySliderHeader } from "../categorySecondarySliderHeader";
import { StyledContainer, StyledSliderContainer } from "./styles";
import { setSingleCategory } from "../../lib/store/slices/category-slice";
import { LoadingCategoriesSkeleton } from "../loadingCategoriesSkeleton";

export const CategorySecondarySlider: React.FC = () => {
  const categoriesState = useSelector((state: RootState) => state.category);
  const { data, isRefetching } = useQuery({
    queryKey: [SINGLE_CATEGORY_QUERY_KEY, categoriesState?.singleCategoryId],
    queryFn: getSingleCategory,
    enabled: !!categoriesState?.singleCategoryId,
  });
  const dispatch = useDispatch();

  const expanded = useSelector((state: RootState) => state.products.expandCategories);
  const handleBack = () => {
    dispatch(
      setSingleCategory({
        id: data?.parent_id,
        name: data?.parent_name,
      })
    );
  };

  let slidesToShow = categoriesState?.categories?.length > 6 ? 6 : categoriesState?.categories?.length;
  let rowsToDisplay = categoriesState?.categories?.length > 12 ? 2 : 1;
  if (data) {
    slidesToShow = data?.subCategories?.length > 6 ? 6 : data?.subCategories?.length;
    rowsToDisplay = data?.subCategories?.length > 12 ? 2 : 1;
  }

  const sliderSettings = {
    className: "slider variable-width",
    infinite: true,
    slidesToScroll: 4,
    slidesToShow: slidesToShow,
    rows: rowsToDisplay,
  };

  if (!categoriesState) return null;
  return (
    <Collapse in={expanded}>
      <StyledContainer divider={data && data.subCategories.length > 0 && <Divider />}>
        <CategorySecondarySliderHeader title={categoriesState?.singleCategoryName} handleBack={handleBack} />
        {isRefetching ? (
          <LoadingCategoriesSkeleton />
        ) : (
          <StyledSliderContainer>
            <Slider rtl {...sliderSettings}>
              {!data && !isRefetching && categoriesState && categoriesState?.categories?.length > 0
                ? categoriesState?.categories?.map((category: Category) => (
                    <CategoryChipSecondary key={category?.id} {...category} />
                  ))
                : null}
              {(data as Category)
                ? data?.subCategories?.map((category: Category) => (
                    <CategoryChipSecondary key={category?.id} {...category} />
                  ))
                : null}
            </Slider>
          </StyledSliderContainer>
        )}
      </StyledContainer>
    </Collapse>
  );
};
