import "./styles.scss";

import { Stack, Typography } from "@mui/material";

import Button from "@myCash/components/form/Button";
import { TickCircle } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface RecieptCardAppendixProps {
  value?: string | number;
  isCompleted: boolean;
  handleOpenModal: () => void;
}

export const RecieptCardAppendix: React.FC<RecieptCardAppendixProps> = ({
  value,
  isCompleted,
  handleOpenModal,
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      className={
        isCompleted ? "invoice-card-appendix" : "not-completed-reciept-appendix"
      }
    >
      {isCompleted ? (
        <>
          <Stack>
            <TickCircle size="16" color="#6EC531" />
            <Typography variant="subtitle2" fontWeight={700} color="#6EC531">
              {t("client.receiptPaid")}
            </Typography>
          </Stack>
          <Typography
            fontWeight={700}
            fontSize={"1rem"}
          >{`${value} ر.س`}</Typography>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          text={`${t("client.payReciept")} ${value && value} ${t("currency")}`}
          notRounded
          onClick={handleOpenModal}
        />
      )}
    </Stack>
  );
};
