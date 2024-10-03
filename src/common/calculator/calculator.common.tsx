import React from "react";
import { CalculatorBtn } from "..";
import { StyledCalculatorContainer } from "./styles";

interface CalculatorProps {
  addNumberToCalculator: (number: string) => void;
  resetCalculatorValue: () => void;
  resetAllInputs?: () => void; 
   removeLastItemCalculatorValue?: () => void;
}
export const Calculator: React.FC<CalculatorProps> = ({
  addNumberToCalculator ,
  resetAllInputs,resetCalculatorValue,
  removeLastItemCalculatorValue
}) => {
  
  const btns: {
    name: string;
    span: number;
    reset?: boolean;
  }[] = [
    { name: "1", span: 1 },
    { name: "2", span: 1 },
    { name: "3", span: 1 },
    { name: "4", span: 1 },
    { name: "5", span: 1 },
    { name: "6", span: 1 },
    { name: "7", span: 1 },
    { name: "8", span: 1 },
    { name: "9", span: 1 },
    { name: "00", span: 1 },
    { name: "0", span: 1 },
    { name: "C", span: 1, reset: true },
    { name: "Clear All", span: 2, reset: true },
    { name: ".", span: 1 },
  ];
  return (
    <StyledCalculatorContainer dir="ltr">
      {btns.map((btn) => {
        // clear all inputs
        if (btn.name === "Clear All" && resetAllInputs) {
          return (
            <CalculatorBtn
              key={btn.name}
              name={btn.name}
              span={btn.span}
              addNumberToCalculator={
                btn.reset ? resetAllInputs : addNumberToCalculator
              }
            />
          );
        } if (btn.name === "Clear All" && resetCalculatorValue) {
          return (
            <CalculatorBtn
              key={btn.name}
              name={btn.name}
              span={btn.span}
              addNumberToCalculator={
                btn.reset ? resetCalculatorValue : addNumberToCalculator
              }
            />
          );
        }if (btn.name === "C" && removeLastItemCalculatorValue) {
          return (
            <CalculatorBtn
              key={btn.name}
              name={btn.name}
              span={btn.span}
              addNumberToCalculator={
                btn.reset ? removeLastItemCalculatorValue : addNumberToCalculator
              }
            />
          );
        }
        return (
          <CalculatorBtn
            key={btn.name}
            name={btn.name}
            span={btn.span}
            addNumberToCalculator={
              btn.reset ? resetCalculatorValue : addNumberToCalculator
            }
          />
        );
      })}
    </StyledCalculatorContainer>
  );
};
