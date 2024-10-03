import { Box } from "@mui/material";
import PlanCard from "./PlanCard";
import { GetPackagesResponseData } from "../../../../types/types";
import i18next from "i18next";
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import { RootState, setSubscriptionPackage } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";
import { getItemWithExpiry } from "@myCash/utils/helpers/storeLocalStorage";

interface Props {
  plans: GetPackagesResponseData[];
}

const PlansStepSlider = ({ plans }: Props) => {
  const dir = i18next.dir();
  
  const dispatch = useDispatch();
  const [package_id, setPackage_id] = useState("")
  const user_ID = useSelector((state: RootState) => state.user.user?.id);
  useEffect(() => {
if(getItemWithExpiry("package_id",String(user_ID))){
  setPackage_id(getItemWithExpiry("package_id",String(user_ID))||"")
  
  dispatch(
    setSubscriptionPackage(getItemWithExpiry("package_id",String(user_ID))||"")
  );
}
  }, [localStorage.getItem("package_id")])
  
  return (
    <Box
      sx={{
        width: "100%",
      }}
     
    >
      <Box component={Swiper} dir={"ltr"}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          1520: {
            slidesPerView: 3,
            spaceBetween: 150, // Reduce space
          },
          750: {
            slidesPerView: 2,
            spaceBetween: 100, // Reduce space
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 50, // Reduce space
          },
        }}
        sx={{
          py: 8, width: "clamp(25rem, 80vw, 90rem)",
          overflow: "visible", // Ensures no content is cut off
          "& .swiper-wrapper": {
            overflow: "visible"
          }
        }}
      >
        {plans.filter(i=>i.id!==1).map((plan) => (
          <SwiperSlide  key={plan.id}>
            <PlanCard  {...plan} dir={dir} packageId={package_id} />
          </SwiperSlide>
        ))}
      </Box>
    </Box>
  );
};

export default PlansStepSlider;
