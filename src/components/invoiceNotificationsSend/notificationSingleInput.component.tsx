import { Calculator, CalculatorInput, StyledInput } from "@myCash/common";
import { Stack, Typography } from "@mui/material";
import { addPayment, resetPayments } from "@myCash/lib";

import { CalculatorActionsButtons } from "@myCash/components";
import { Formik } from "formik";
import { StyledCalculatorTextField } from "./styles";
import { useCalculator } from "@myCash/hooks";
import { useDispatch } from "react-redux";

interface NotificationSingleInputProps {
  disabled?: boolean;
}

export const NotificationSingleInput: React.FC<
  NotificationSingleInputProps
> = () =>
  //   {
  //   // disabled = true,
  // }
  {
    const {
      calculatorValue,
      addNumberToCalculator,
      handleTextFieldChange,
      resetCalculatorValue,removeLastItemCalculatorValue
    } = useCalculator();
    const dispatch = useDispatch();

    return (
      <Formik
        onSubmit={() => {
          dispatch(resetPayments());
          dispatch(addPayment(Number(calculatorValue)));
          resetCalculatorValue();
        }}
        initialValues={{
          amount: calculatorValue,
        }}
      >
        {(props) => (
          <>
            <CalculatorInput>
              <form onSubmit={props.handleSubmit}>
                <StyledInput>
                  <StyledCalculatorTextField
                    name="amount"
                    label=""
                    value={calculatorValue}
                    type="text"
                    placeholder="0.0"
                    onChange={handleTextFieldChange}
                    disabled={true}
                  />
                  <Stack className="first-div">
                    <Typography variant="h5" color="grey.400">
                      ريال
                    </Typography>
                    <Typography variant="h5" color="grey.400">
                      SAR
                    </Typography>
                  </Stack>
                </StyledInput>
              </form>
            </CalculatorInput>
            <Calculator
              addNumberToCalculator={addNumberToCalculator}
              resetCalculatorValue={resetCalculatorValue}
              removeLastItemCalculatorValue={removeLastItemCalculatorValue}
            />
            <CalculatorActionsButtons
              resetCalculatorValue={resetCalculatorValue}
              handleSubmit={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    );
  };
