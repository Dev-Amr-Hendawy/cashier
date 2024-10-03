import "./styles.scss";
import { ButtonBase, Typography } from "@mui/material";
import { useLogout } from "@myCash/hooks";
import { LogoutCurve } from "iconsax-react";
import { useTranslation } from "react-i18next";

export const NewLogout = () => {
  const { mutate, isPending } = useLogout();
  const { t, i18n } = useTranslation();

  const submitHandler = (values: { endCash: string; endVisa: string }) => {
    mutate(values);
  };

  return (
    <ButtonBase
      className="logout-container"
      disabled={isPending}
      onClick={() => submitHandler({ endCash: "0", endVisa: "0" })}
    >
      <Typography color="error" variant="h5" textAlign="center">
        {t("logout")}
      </Typography>

      <LogoutCurve
        size="32"
        color="#E83E00"
        style={{
          transform: `rotate(${i18n.language === "ar" ? "0deg" : "180deg"})`,
        }}
      />
    </ButtonBase>
  );
};
