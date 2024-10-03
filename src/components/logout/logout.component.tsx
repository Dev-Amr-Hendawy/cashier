import "./styles.scss";
import { ButtonBase, Typography } from "@mui/material";
import { EndShiftModalContent } from "@myCash/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// TODO::refac
export const Logout = () => {
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <ButtonBase
        className="logout-container"
        onClick={() => {
          setShiftModalOpen(true);
        }}
      >
        <Typography color="error" variant="h5" textAlign="center">
          {t("logoutFinish")}
        </Typography>
      </ButtonBase>
      <EndShiftModalContent
        open={shiftModalOpen}
        handleClose={() => setShiftModalOpen(false)}
      />
    </>
  );
};
