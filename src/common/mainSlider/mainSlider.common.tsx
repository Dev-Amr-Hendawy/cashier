import { CategorySkeleton } from ".."; // Assuming CategorySkeleton is still used
import React from "react";
import Slider from "react-slick";
import { SliderContainer } from "./styles";

interface SliderProps<T> {
  // Define the type for the items passed to the slider
  items: T[];
  loading: boolean;
}

const withSlider = <T extends object>(
  CardComponent: React.ComponentType<T>
) => {
  return ({ items, loading }: SliderProps<T>) => {
    const settings = {
      infinite: true,
      slidesToShow: items?.length > 4 ? 4 : items?.length,
      speed: 1500,
      slidesToScroll: items?.length > 4 ? 3 : items?.length - 1,
      rtl: true,
      arrows: false,
      dots: false,
      autoplay: true,
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
        <Slider {...settings}>
          {!loading && items?.length > 0
            ? items.map((item, index) => (
                <CardComponent key={index} {...item} />
              ))
            : null}
        </Slider>
      </SliderContainer>
    );
  };
};

export default withSlider;
