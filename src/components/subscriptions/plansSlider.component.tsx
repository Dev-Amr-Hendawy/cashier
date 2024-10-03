import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SubscriptionPlanCard } from "@myCash/common";
import { GetPackagesResponseData } from "@myCash/types";
import { useDispatch } from "react-redux";
import { setSubscriptionPackage } from "@myCash/lib";

interface PlansSliderProps {
  plans: GetPackagesResponseData[];
  handlePlanClick: () => void;
}

export const PlansSlider = ({ plans, handlePlanClick }: PlansSliderProps) => {
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: plans.length > 3, // must be equal or greater than slides to show
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1, //changed to 1 to fix warning
    centerMode: true,
    centerPadding: "40px",
    arrows: false,
    autoPlay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Box
      sx={{
        width: {
          xs: "95vw",
          xl: "90vw",
        },
        "& .slick-slide": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "37rem",
          direction: "ltr",
        },
        "& .slick-slider": {},
      }}
    >
      <Slider {...settings} rtl>
        {plans.map((plan) => (
          <SubscriptionPlanCard
            buttonName="subscriptions.renewSubscription"
            handleClick={() => {
              dispatch(setSubscriptionPackage(plan?.id));
              handlePlanClick();
            }}
            {...plan}
            key={plan.id}
          />
        ))}
      </Slider>
    </Box>
  );
};
