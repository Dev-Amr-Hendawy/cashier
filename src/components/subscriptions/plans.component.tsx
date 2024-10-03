import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useGetPackages } from "@myCash/hooks";
import { useTranslation } from "react-i18next";
import { PlansSlider } from "@myCash/components";
import { setSubscriptionStep } from "@myCash/lib";
import { CircularLoader, HeaderWithBack } from "@myCash/common";

interface PlansProps {}

export const Plans: React.FC<PlansProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, isPending } = useGetPackages();

  return (
    <>
      <HeaderWithBack
        title={t("subscriptions.selectPlan")}
        handleClose={() => dispatch(setSubscriptionStep(1))}
      />
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {isPending && <CircularLoader size={40} />}
        {data?.data?.data && (
          <PlansSlider
            handlePlanClick={() => {
              dispatch(setSubscriptionStep(3));
            }}
            plans={data?.data?.data}
          />
        )}
      </Box>
    </>
  );
};
