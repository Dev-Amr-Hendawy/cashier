import { ClientRecieptData, PayRecieptForm } from ".";
import { Stack, Typography } from "@mui/material";

import { CommonModal } from "@myCash/common";
import { Receipt } from "@myCash/types";
import { useTranslation } from "react-i18next";

interface PayRecieptModalProps {
  open: boolean;
  handleClose: () => void;
  receipt: Receipt;
}

export const PayRecieptModal: React.FC<PayRecieptModalProps> = ({
  open,
  handleClose,
  receipt,
}) => {
  const { t } = useTranslation();
  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      hasActions={false}
      title={t("client.payReciept")}
    >
      <Stack gap={"1rem"}>
        <ClientRecieptData receipt={receipt} />
        <Typography variant="subtitle2" color={"#2D2D2D66"}>
          {t("client.enterFollowingData")}
        </Typography>
        <PayRecieptForm handleClose={handleClose} receipt={receipt} />
      </Stack>
    </CommonModal>
  );
};
