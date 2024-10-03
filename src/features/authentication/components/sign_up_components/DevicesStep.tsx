import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

import AuthInfo from "../AuthInfo";
import DeviceCard from "./DeviceCard";
import Button from "../../../../components/form/Button";
import { GetDevicesResponseData } from "../../../../types/types";
import { getData } from "../../../../apis";
import { changeStep } from "../../../../lib/store/slices/form-step";
import { ScrollContainer } from "@myCash/common";
import AuthStepsLayout from "./AuthStepsLayout";
import NewLanguageButton from "@myCash/components/ui/NewLanguageButton";

import { useCalculateSubscription } from "@myCash/hooks";
import { RootState, setSubscriptionDevice } from "@myCash/lib";
interface Props {
  // handleSubmit: (values: SignUpData) => void;
  // isPending: boolean;
}

const DevicesStep: React.FC<Props> = (props) => (
  <AuthStepsLayout component={<DevicesStepForm {...props} />} />
);

export default DevicesStep;

const DevicesStepInfo = () => {
  const { t } = useTranslation();
  return (
    <AuthInfo
      title={t("signUp.stepTwo.title")}
      description={t("signUp.stepTwo.description")}
    />
  );
};

interface DevicesStepFormProps {
  // isPending: boolean;
}

const DevicesStepForm: React.FC<DevicesStepFormProps> = () => {
  const { mutate, isPending } = useCalculateSubscription();
  const dir = i18next.dir();
  const dispatch = useDispatch();

  const [deviceCards, setDeviceCards] = useState<GetDevicesResponseData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<number>(0);
  const subscription = useSelector((state: RootState) => state.subscription);
  const user_ID = useSelector((state: RootState) => state.user.user?.id);
  const handleSubmit = (check = true) => {
    
    
    if(!check){
      dispatch(setSubscriptionDevice(null));
        localStorage.removeItem("device_id") }
    mutate({
      package_id: subscription.subscriptionPayment.package_id
        ?`${ subscription.subscriptionPayment.package_id}`
        : getItemWithExpiry("package_id",String(user_ID))
        ? `${ getItemWithExpiry("package_id",String(user_ID))}`
        : "",
      device_country_id: check
        ? subscription.subscriptionPayment.device_id
          ? `${ subscription.subscriptionPayment.device_id}`
          : getItemWithExpiry("device_id",String(user_ID))
          ?`${getItemWithExpiry("device_id",String(user_ID))}`
          : ""
        : "",
    });
  };

  useEffect(() => {
    const fetchDevices = async () => {
      const result = await getData(`client/general_data/get_devices?limit=100`);
      setDeviceCards(result?.data || []);
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    if (getItemWithExpiry("device_id",String(user_ID))) {
      setSelectedDevice(Number(getItemWithExpiry("device_id",String(user_ID))) || 0);

      dispatch(setSubscriptionDevice(getItemWithExpiry("device_id",String(user_ID)) || ""));
    }
  }, [localStorage.getItem("device_id")]);
  const handleBack = () => dispatch(changeStep(3));
  const handleNext = () => {
    handleSubmit(false)
    dispatch(changeStep(5));
  };
  const handleOnSubmit = () => {
    setItemWithExpiry("device_id", String(selectedDevice),60*24) 
    handleSubmit()
    dispatch(changeStep(5));
  };



  return (
    <Stack spacing={5} width="clamp(25rem, 80vw, 90rem)">
      <NewLanguageButton position="absolute" />
      <Stack  sx={{
        position: "absolute",
        top:  "4rem",
        right: {
          xs: "2rem",
          xl: "4rem",
        },
      }}> <NewLogout/></Stack> 
      <DevicesStepInfo />

      <DeviceList
        deviceCards={deviceCards}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />

      <NavigationButtons
        dir={dir}
        isPending={isPending}
        selectedDevice={selectedDevice}
        handleBack={handleBack}
        handleNext={handleNext}
        handleSubmit={handleOnSubmit}
      />
    </Stack>
  );
};

interface DeviceListProps {
  deviceCards: GetDevicesResponseData[];
  selectedDevice: number;
  setSelectedDevice: (device: number) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
  deviceCards,
  selectedDevice,
  setSelectedDevice,
}) => {
  const dir = i18next.dir();

  return (
    <Stack height="50vh">
      <ScrollContainer>
        <Stack
          padding="0 1rem"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xl: "1fr 1fr 1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
              md: "1fr 1fr 1fr",
              sm: "1fr 1fr",
              xs: "1fr 1fr",
            },
            gap: 5,
          }}
        >
          {deviceCards.map((device, index) => (
            <DeviceCard
              key={index}
              dir={dir}
              setIsDeviceSelected={setSelectedDevice}
              selectedDevice={selectedDevice}
              {...device}
            />
          ))}
        </Stack>
      </ScrollContainer>
    </Stack>
  );
};

interface NavigationButtonsProps {
  dir: string;
  isPending: boolean;
  selectedDevice: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  dir,
  isPending,
  selectedDevice,
  handleBack,
  handleNext,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Column on smaller screens, row on larger screens
        gap: { xs: 3, sm: 2 }, // Larger gaps on smaller screens
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flex: 1,
          width: { xs: "100%", sm: "50%" }, // Full width on smaller screens, half on larger
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            width: { xs: "100%", sm: "50%" }, // Full width on smaller screens, half on larger
          }}
        >
          <Button
            text={
              <Box alignItems="center" display="flex" gap={1} width="80%">
                {dir !== "rtl" ? <ArrowLeft2 /> : <ArrowRight2 />}
                <Box flex={1}>{t("signUp.stepTwo.previous")}</Box>
              </Box>
            }
            type="button"
            variant="outlined"
            onClick={handleBack}
          />{" "}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flex: 1,
          flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens, row on larger
          width: { xs: "100%", sm: "50%" }, // Full width on small screens
        }}
      >
        <Box
          alignItems="center"
          display="flex"
          gap={1}
          width={{ xs: "100%", sm: "40%" }} // Full width on smaller screens, 40% on larger
        >
          <Button
            text={t("endShift.skip")}
            type="button"
            variant="outlined"
            onClick={handleNext}
          />
        </Box>
        <Button
          text={
            <Box alignItems="center" display="flex" gap={1} width="80%">
              <Box flex={1}>{t("signUp.stepTwo.continue")}</Box>
              {dir === "rtl" ? <ArrowLeft2 /> : <ArrowRight2 />}
            </Box>
          }
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedDevice || isPending}
          loading={isPending}
        />
      </Box>
    </Box>
  );
};

interface DevicesProps {
  Devices: GetDevicesResponseData[];
  setIsDeviceSelected: (value: number) => void;
  selectedDevice: number;
  setWholeDevice?: () => void;
}
import { Navigation, Pagination, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NewLogout } from "@myCash/components";
import { getItemWithExpiry, setItemWithExpiry } from "@myCash/utils/helpers/storeLocalStorage";

export const DevicesStepSlider = ({
  Devices,
  setIsDeviceSelected,
  selectedDevice,
}: DevicesProps) => {
  const dir = i18next.dir();

  return (
    <Box
      sx={{
        width: "100%",
      }}
      dir={dir} // use the dir dynamically based on i18next
    >
      <Box
        component={Swiper}
        dir={dir}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          1520: {
            slidesPerView: 5,
            spaceBetween: 50, // Reduce space
          },
          750: {
            slidesPerView: 3,
            spaceBetween: 30, // Reduce space
          },
          300: {
            slidesPerView: 2,
            spaceBetween: 10, // Reduce space
          },
        }}
        sx={{
          py: 8,
          width: "clamp(25rem, 80vw, 90rem)",
          overflow: "visible", // Ensures no content is cut off
          "& .swiper-wrapper": {
            overflow: "visible",
          },
        }}
      >
        {Devices.map((Device, index) => (
          <SwiperSlide key={Device.id}>
            <DeviceCard
              {...Device}
              key={index || Device.id}
              dir={dir}
              setIsDeviceSelected={setIsDeviceSelected}
              selectedDevice={selectedDevice}
            />
          </SwiperSlide>
        ))}
      </Box>
    </Box>
  );
};
