import { CalculatorSideContainer } from "./styles";
import { QuickInvoiceDoubleInput } from "./quickInvoiceDoubleInput.component";
import { QuickInvoiceSingleInput } from "./quickInvoiceSingleInput.component";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";

interface CalculatorSideProps {
  disabled?: boolean;
}

export const QuickInvoiceCalculator: React.FC<CalculatorSideProps> = ({ disabled = false }) => {
  const { paymentType } = useSelector((state: RootState) => state.quickInvoice);
  return (
    <CalculatorSideContainer>
      {paymentType !== 4 ? (
        <QuickInvoiceSingleInput disabled={disabled} />
      ) : (
        <QuickInvoiceDoubleInput disabled={disabled} />
      )}
    </CalculatorSideContainer>
  );
};
