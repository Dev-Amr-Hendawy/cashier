import { Stack } from "@mui/material";
import { PaymentTypeCard } from "@myCash/common";
import { paymentButtons } from "@myCash/constants";
import { RootState } from "@myCash/lib";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface RecieptPaymentTypesProps {}

export const RecieptPaymentTypes: React.FC<RecieptPaymentTypesProps> = () => {
  const paymentState = useSelector((state: RootState) => state.payment);
  const { t } = useTranslation();
  return (
    <Stack direction={"row"} gap={"0.5rem"} padding={"0.5rem 0.5rem 0 2rem"}>
      {paymentButtons.map((button) => (
        <PaymentTypeCard
          key={button.type}
          active={paymentState.paymentType === button.type}
          title={t(button.title)}
          icon={button.icon && button.icon}
          iconImages={button.iconImages && button.iconImages}
        />
      ))}
    </Stack>
  );
};
