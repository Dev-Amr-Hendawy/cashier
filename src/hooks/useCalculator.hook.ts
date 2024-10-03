import { useState } from "react";

export const useCalculator = () => {
  const [calculatorValue, setCalculatorValue] = useState("");
  const addNumberToCalculator = (value: string) => {
    setCalculatorValue((prevState) => {
      // If the value is a dot and the current value already contains a dot, return the current value
      if (value === "." && prevState.includes(".")) {
        return prevState;
      }
      // Otherwise, append the value to the current value
      return prevState + value;
    });
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the value is a valid number or a decimal point
    if (!isNaN(Number(value)) || value === ".") {
      setCalculatorValue(value);
    }
  };
  const resetCalculatorValue = () => {
    setCalculatorValue("");
  };
  const removeLastItemCalculatorValue = () => {
    setCalculatorValue((prevState) => {
      if (typeof prevState === 'string' || Array.isArray(prevState)) {
        return prevState.slice(0, -1);
      }
      return prevState; // If it's neither a string nor an array, return it unchanged
    });
  };
  return {
    calculatorValue,
    addNumberToCalculator,
    handleTextFieldChange,
    resetCalculatorValue,removeLastItemCalculatorValue
  };
};
