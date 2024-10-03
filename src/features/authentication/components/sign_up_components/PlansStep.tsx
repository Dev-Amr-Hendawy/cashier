import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getPackages } from "../../../../apis/general/packages.api";
import { PACKAGES_QUERY_KEY } from "../../../../constants";
import PlansStepSlider from "./PlansStepSlider";
import AuthStepsLayout from "./AuthStepsLayout";
import NewLanguageButton from "@myCash/components/ui/NewLanguageButton";
import { NewLogout } from "@myCash/components";

interface Props {}

const PlansStep: React.FC<Props> = (props) => {
  return <AuthStepsLayout component={<PlansStepContent {...props} />} />;
};

export default PlansStep;

interface PlansStepContentProps {}
const PlansStepContent: React.FC<PlansStepContentProps> = (props) => {


  const { data, isPending } = useQuery({
    queryKey: [PACKAGES_QUERY_KEY],
    queryFn: () => getPackages(),
  });
  const { t } = useTranslation();
  return (
    <Stack
     
      width={'clamp(25rem, 80vw, 90rem)'}
    >
      <NewLanguageButton position="absolute" />
    <Stack  sx={{
        position: "absolute",
        top:  "4rem",
        right: {
          xs: "2rem",
          xl: "4rem",
        },
      }}> <NewLogout/></Stack> 

      <Stack spacing={8} >
        <Stack direction={"row"} spacing={2}>
         
          <Typography variant={"h2"} color={"gey.900"}>
            {t("signUp.stepOne.title")}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {isPending && (
            <CircularProgress
              size={40}
              color="primary"
              sx={{ margin: "auto auto" }}
            />
          )}
          {data?.data?.data && (
            <PlansStepSlider plans={data?.data?.data} {...props} />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};
