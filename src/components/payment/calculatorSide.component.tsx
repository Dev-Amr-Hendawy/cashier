import { CalculatorDoubleInput } from "./calculatorDoubleInput.component";
import { CalculatorSideContainer } from "./styles";
import { CalculatorSingleInput } from "@myCash/components";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";

interface CalculatorSideProps {
  disabled?: boolean;
}

export const CalculatorSide: React.FC<CalculatorSideProps> = ({
  disabled = false,
}) => {
  const paymentType = useSelector(
    (state: RootState) => state.payment.paymentType
  );
  return (
    <CalculatorSideContainer>
      {paymentType !== 4 ? (
        <CalculatorSingleInput disabled={disabled} />
      ) : (
        <CalculatorDoubleInput disabled={disabled} />
      )}
    </CalculatorSideContainer>
  );
};
