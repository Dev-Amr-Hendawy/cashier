import { Calculator, CalculatorDoubleTextField } from "@myCash/common";
import { addQuickInvoicePayment, resetPayments } from "@myCash/lib";

import { CalculatorActionsButtons } from "../payment";
import { Formik } from "formik";
import { StyledDoubleCalculatorContainer } from "./styles";
import { useCalculator } from "@myCash/hooks";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CalculatorDoubleInputProps {
  disabled?: boolean;
}

export const QuickInvoiceDoubleInput: React.FC<CalculatorDoubleInputProps> = ({ disabled }) => {
  const { t } = useTranslation();
  const firstInput = useCalculator();
  const secondInput = useCalculator();
  const [activeInput, setActiveInput] = useState(0);
  const resetAllInputs = () => {
    firstInput.resetCalculatorValue();
    secondInput.resetCalculatorValue();
  };
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          firstInput: firstInput.calculatorValue,
          secondInput: secondInput.calculatorValue,
        }}
        onSubmit={() => {
          dispatch(resetPayments());
          dispatch(
            addQuickInvoicePayment({
              firstInput: Number(firstInput.calculatorValue),
              secondInput: Number(secondInput.calculatorValue),
            })
          );
          resetAllInputs();
        }}
      >
        {(props) => (
          <>
            <form onSubmit={props.handleSubmit}>
              <StyledDoubleCalculatorContainer>
                <CalculatorDoubleTextField
                  name="firstInput"
                  label={t("paymentInvoice.cashMoney")}
                  value={firstInput.calculatorValue}
                  onChange={firstInput.handleTextFieldChange}
                  onClick={() => setActiveInput(1)}
                  disabled={disabled}
                />
                <CalculatorDoubleTextField
                  name="secondInput"
                  label={t("paymentInvoice.visaMoney")}
                  value={secondInput.calculatorValue}
                  onChange={secondInput.handleTextFieldChange}
                  onClick={() => setActiveInput(2)}
                  disabled={disabled}
                />
              </StyledDoubleCalculatorContainer>
            </form>
            <Calculator
              addNumberToCalculator={
                activeInput === 1 ? firstInput.addNumberToCalculator : secondInput.addNumberToCalculator
              }
              resetCalculatorValue={
                activeInput === 1 ? firstInput.resetCalculatorValue : secondInput.resetCalculatorValue
              }
              resetAllInputs={resetAllInputs}
            />
            <CalculatorActionsButtons handleSubmit={props.handleSubmit} resetCalculatorValue={resetAllInputs} />
          </>
        )}
      </Formik>
    </>
  );
};
