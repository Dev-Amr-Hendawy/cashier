import { Stack, Typography } from "@mui/material";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import ProccessLogo from "../../assets/images/profile-logo.svg";


export const ProccessLoader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Stack  className="proccess-loader" >
      <img
        src={ProccessLogo}
        loading="lazy"
        width={225}
        height={221}
        alt="ProccessLogo"
      />
      <Typography variant="h2" >
        {t("settings.proccess")}</Typography>
    </Stack>
  );
};
