import { Category } from "../../types/types";
import { CategoryChip } from "../categoryChip";
import { CategorySkeleton } from "../categorySkeleton";
import Slider from "react-slick";
import { SliderContainer } from "./styles";

type CategorySliderProps = {
  categories: Category[];
  loading: boolean;
};

export const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  loading,
}) => {
  const settings = {
    infinite: categories?.length > 4,
    slidesToShow: categories?.length > 4 ? 4 : categories?.length,
    speed: 1500,
    slidesToScroll: categories?.length > 4 ? 3 : categories?.length - 1,
    rtl: true,
    arrows: false,
    dots: false,
    autoplay: false,
  };
  if (loading) return <CategorySkeleton />;
  return (
    <SliderContainer
      sx={{
        "& .slick-slide": {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Slider {...settings} pauseOnFocus pauseOnHover>
        {!loading && categories?.length > 0
          ? categories.map((category: Category) => (
              <CategoryChip key={category.id} {...category} />
            ))
          : null}
      </Slider>
    </SliderContainer>
  );
};
