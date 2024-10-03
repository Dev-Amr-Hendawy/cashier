import { Box, Stack, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import check from "../../../../assets/icons/success-icon.svg";
import Icon from "../../../../components/ui/Icon";
import { GetPackagesResponseData } from "../../../../types/types";
import { useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { changeStep } from "../../../../lib/store/slices/form-step";
import { formatMoney } from "@myCash/utils";
import Button from "@myCash/components/form/Button";
import {  RootState, setSubscriptionPackage } from "@myCash/lib";
import { setItemWithExpiry } from "@myCash/utils/helpers/storeLocalStorage";


interface Props extends GetPackagesResponseData {
  dir: "rtl" | "ltr";
  packageId:string;
}

const PlanCard = ({
  finalPrice,
  id,
  desc_ar,
  desc_en,
  dir,
  name_ar,
  name_en,
  isDiscount,
  discountType,
  discount,
  price,
  features,packageId
}: Props) => {

  
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const user = useSelector((state: RootState) => state.user.user);
  const handleClick = () => {
    setFieldValue("package_id", id);

    dispatch(
          setSubscriptionPackage( id)
        );
    dispatch(changeStep(4));
    setItemWithExpiry("package_id",String(id),60*24)
    localStorage.setItem("user_id", String(user?.id))
    
  };

  const getDescription = () => (dir === "rtl" ? desc_ar : desc_en);
  const getPlanName = () => (dir === "rtl" ? name_ar : name_en);

  return (
    <StyledContainer subscription={packageId&&Number(packageId)===id?true:false}  dir={dir}  >
      <Stack spacing={4} height="100%" sx={{ flexDirection: "column" }}>
        <Stack flex={1} spacing={4}>
          <FeatureBadge description={getDescription()} />
          <PlanHeader
            name={getPlanName()}
            isDiscount={isDiscount}
            discountType={discountType}
            discount={discount}
          />
          <PriceDisplay
            finalPrice={finalPrice}
            price={price}
            isDiscount={isDiscount}
          />
          <FeatureList features={features} dir={dir} planId={id} />
        </Stack>
        <ButtonSection handleClick={handleClick} />
      </Stack>
    </StyledContainer>
  );
};

export default PlanCard;

const FeatureBadge = ({ description }: { description: string }) => (
  <Box display="flex">
    <Stack
      sx={{
        p: "0.4rem 1rem",
        backgroundColor: "#F33",
        fontSize: "0.75rem",
        color: "#FFF",
        borderRadius: "99rem",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {" "}
      {/* الأكثر شيوعا */}
      <DiscountIcon />
      {description}
    </Stack>
  </Box>
);

const DiscountIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10.0423 1.6665L8.9006 3.99984C8.0848 5.66679 6.99144 7.18285 5.66726 8.48317L5.51726 8.62484C4.66682 9.45048 4.1809 10.5813 4.16726 11.7665V11.9165C4.14474 14.2374 5.52777 16.3416 7.66726 17.2415L7.88393 17.3332C9.28715 17.9292 10.8724 17.9292 12.2756 17.3332H12.3256C14.4811 16.3967 15.8641 14.2581 15.8339 11.9082V8.2915C15.1156 9.93194 13.8111 11.2454 12.1756 11.9748C12.1756 11.9748 12.1756 11.9748 12.1256 11.9748C12.0756 11.9748 11.4923 12.2165 11.2423 11.9748C11.019 11.7489 10.9976 11.3925 11.1923 11.1415L11.2506 11.0998H11.2923C13.2054 9.64566 13.6514 6.95127 12.3089 4.95817C11.2256 3.30817 10.0423 1.6665 10.0423 1.6665Z"
      fill="white"
    />
  </svg>
);

const PlanHeader = ({
  name,
  isDiscount,
  discountType,
  discount,
}: {
  name: string;
  isDiscount: number|string|null;
  discountType: number|string|null;
  discount: number|string|null;
}) => (
  <Box
    sx={{ display: "flex", gap: 2, flexDirection: "row", alignItems: "center" }}
  >
    <Typography
      variant="h3"
      sx={{ color: "#000", fontWeight: "bold", fontSize: "1.75rem" }}
    >
      {name}
    </Typography>
    {isDiscount ? (
      <DiscountBadge discountType={discountType} discount={discount} />
    ):null}
  </Box>
);

const DiscountBadge = ({
  discountType,
  discount,
}: {
  discountType:number|string|null;
  discount:number|string|null;
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        p: "0.3rem 0.8rem",
        backgroundColor: "#F66",
        fontSize: "0.75rem",
        color: "#FFF",
        gap:2,
        borderRadius: "99rem",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2">{t("discount-2")}</Typography>
      {discountType === 2 ? `${discount}%` : `${discount}`}
    </Stack>
  );
};

const PriceDisplay = ({
  price,
  finalPrice,
  isDiscount,
}: {
  finalPrice: string;
  price: string;
  isDiscount:number|string|null;
}) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Typography variant="h4" color="#000">
      {formatMoney(finalPrice)}
    </Typography>
    {isDiscount ? (
      <Typography
        variant="body2"
        color="grey.600"
        fontSize="1.1rem"
        sx={{ textDecoration: "line-through" }}
      >
        {formatMoney(price)}
      </Typography>
    ):null}
  </Stack>
);

const FeatureList = ({
  features,
  dir,
  planId,
}: {
  features: { name: string; name_ar: string; name_en: string; id: number }[];
  dir: string;
  planId: number;
}) => (
  <Stack spacing={0.5}>
    {features.map((feature) => (
      <FeatureDescription
        key={`${planId}-${feature.id}`}
        description={dir === "rtl" ? feature.name_ar : feature.name_en}
      />
    ))}
  </Stack>
);

const FeatureDescription = ({ description }: { description: string }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box
      sx={{
        width: "1.5rem",
        height: "auto",
      }}
    >
      <Icon icon={check} />
    </Box>
    <Typography variant="subtitle2" color="grey.800">
      {description}
    </Typography>
  </Stack>
);

const ButtonSection = ({ handleClick }: { handleClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <Stack mt="auto">
      <Button
        variant="contained"
        onClick={handleClick}
        text={t("signUp.stepOne.startNow")}
      />
    </Stack>
  );
};

const StyledContainer = styled("div")(({subscription}:{subscription:boolean}) => ({
  position: "relative",
  borderRadius: "0.75rem",
  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
  border:subscription?"2px solid var(--secondary-main)":"none",
  display: "grid",
  padding: "1.5rem 1.625rem",
  backgroundColor: "#fff",
  width: "100%",
  minHeight: "32rem",
}));
export const Price = ({ price }: { price: string }) => {
  const { t } = useTranslation();
  return (
    <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
      <Typography variant={"h6"} color={"grey.900"}>
        {t("currency")}
      </Typography>
      <Typography variant="h1" color="secondary.main">
        {price}
      </Typography>
      <Typography variant={"h6"} color={"grey.900"}>
       {t("year")}
      </Typography>
    </Stack>
  );
};

export const Subscription = ({
  subscription,
  isCurrent,
}: {
  subscription: string;
  isCurrent?: boolean;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: isCurrent ? "secondary.main" : "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "1rem",
        fontWeight: "600",
        position: "absolute",
        height: "4rem",
        padding: "0 2.5rem",
        top: "-2rem",
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "1.25rem",
        boxShadow: "0px 1px 8px 0px #D1D3D433",
        textWrap: "nowrap",
      }}
    >
      {subscription}
    </Box>
  );
};

export const Description = ({
  description,
  id,
}: {
  description: string;
  id: number;
}) => {
  return (
    <Stack direction={"row"} spacing={2} alignItems="center">
      <Box
        sx={{
          width: ".75rem",
          height: "auto",
        }}
      >
        <Icon icon={check} />
      </Box>
      <Typography variant={"subtitle2"} color={"grey.800"} key={id}>
        {description}
      </Typography>
    </Stack>
  );
};