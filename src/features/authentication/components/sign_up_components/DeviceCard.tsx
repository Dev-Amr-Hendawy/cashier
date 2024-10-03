import { Box,  Stack, Typography, styled } from "@mui/material";
// import { useTranslation } from "react-i18next";
import { GetDevicesResponseData } from "../../../../types/types";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import {  setSubscriptionDevice } from "@myCash/lib";

import ImageDevice from "../../../../assets/icons/device.svg";
import { formatMoney } from "@myCash/utils";
interface Props extends GetDevicesResponseData {
  dir: "rtl" | "ltr";
  setIsDeviceSelected: (value: number) => void;
  selectedDevice: number;
  setWholeDevice?: () => void;
}

const DeviceCard = ({
  price,
  // device,
  id,
  isDiscount,
  finalPrice,
  // dir,
  setIsDeviceSelected,
  selectedDevice,
  setWholeDevice,
}: Props) => {
  // const { t } = useTranslation();
  // const {
  // //   description_ar,
  // //   description_en,
  //   // image,
  // //   name_ar,
  // //   name_en,
  // //   brand,
  // //   model,
  // } = device;


  const { setFieldValue } = useFormikContext();
  const dispatch = useDispatch();
  

  const handleSelect = () => {
    setFieldValue("device_country_id", id);
 
    dispatch(
      setSubscriptionDevice(id)
    );
    setIsDeviceSelected(id);
    setWholeDevice && setWholeDevice();
  };
  return (
    <StyledContainer
      sx={{
        borderColor: selectedDevice == id ? "secondary.main" : "",
      }}
    >
      <Stack
        onClick={handleSelect}
        sx={{
          padding: "1.2rem 0.75rem",
        
        }}
        spacing={1.5}
  
      >
        <Stack
          direction={"column"}
          sx={{
            padding: "0 1.5rem",
            justifyContent:"center"
          }}
          spacing={3}
        >
          <Box
            component={"img"}
            src={ImageDevice}
            alt={"Device"}
            sx={{ width: "auto", height: "4.5rem", objectFit: "contain", mx: "auto" }}
          />
          {/* <Box
            component={"img"}
            src={image}
            alt={model}
            sx={{ width: "auto", height: "4.5rem", objectFit: "contain" }}
          /> */}
          <Stack spacing={1.25}>
            <Stack direction="row" spacing={2}>
              <Typography variant="h6" color="grey.800">
                {/* {dir == "rtl" ? description_ar ?? "" : description_en ?? ""} */}
              </Typography>
              <Typography variant="h6" color="grey.900">
                {/* {dir == "rtl" ? name_ar ?? "" : name_en ?? ""} */}
              </Typography>
            </Stack>
            <Typography variant="h6" color="grey.800">
              {/* {dir == "rtl" ? brand.name_ar ?? "" : brand.name_en ?? ""} */}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h4" color="#000">
            {formatMoney(finalPrice)}
          </Typography>
          {isDiscount ? (
            <Typography
              variant="body2"
              color="#F99"
              fontSize="1.1rem"
              sx={{ textDecoration: "line-through" }}
            >
              {formatMoney(price)}
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </StyledContainer>
  );
};

export default DeviceCard;

const StyledContainer = styled(Box)(({ theme }) => ({
  border: "2px solid",
  cursor: "pointer",
  borderColor: theme.palette.grey[700],
  borderRadius: "1.25rem",
  transition: "all .3s ease-in-out",

  "&:hover": {
    borderColor: theme.palette.secondary.main,
    "& .divider": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));
