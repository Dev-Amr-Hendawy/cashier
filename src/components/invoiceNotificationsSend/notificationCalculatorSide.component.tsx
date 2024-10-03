import { NotificationDoubleInput } from "./notificationDoubleInput.component";
import { CalculatorSideContainer } from "./styles";
import { NotificationSingleInput } from "@myCash/components";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";

interface NotificationCalculatorSideProps {
  disabled?: boolean;
}

export const NotificationCalculatorSide: React.FC<
  NotificationCalculatorSideProps
> = ({ disabled = false }) => {
  const paymentType = useSelector(
    (state: RootState) => state.payment.paymentType
  );
  return (
    <CalculatorSideContainer>
      {paymentType !== 4 ? (
        <NotificationSingleInput disabled={disabled} />
      ) : (
        <NotificationDoubleInput disabled={disabled} />
      )}
    </CalculatorSideContainer>
  );
};
