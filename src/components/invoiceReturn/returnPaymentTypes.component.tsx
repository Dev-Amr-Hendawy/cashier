import { PaymentTypeCard } from "@myCash/common";
import { Stack } from "@mui/material";
import { paymentButtons } from "@myCash/constants";
import { useTranslation } from "react-i18next";

interface ReturnPaymentTypesProps {
  paymentType: number;
}

export const ReturnPaymentTypes: React.FC<ReturnPaymentTypesProps> = ({
  paymentType,
}) => {
  // const paymentState = useSelector((state: RootState) => state.payment);
  const { t } = useTranslation();
  return (
    <Stack direction={"row"} gap={"0.5rem"} padding={"0.5rem 0.5rem 0 2rem"}>
      {paymentButtons.map((button) => (
        <PaymentTypeCard
          key={button.type}
          active={paymentType === button.type}
          title={t(button.title)}
          icon={button.icon && button.icon}
          iconImages={button.iconImages && button.iconImages}
        />
      ))}
    </Stack>
  );
};
