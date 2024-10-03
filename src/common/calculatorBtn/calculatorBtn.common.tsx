import React from "react";
import { StyledCalculatorBtn } from "./styles";
import { TagCross } from "iconsax-react";

interface CalculatorBtnProps {
  name: string | number;
  span: number;
  addNumberToCalculator: (number: string) => void;
}

export const CalculatorBtn: React.FC<CalculatorBtnProps> = ({
  name,
  span,
  addNumberToCalculator,
}) => {
  return (
    <StyledCalculatorBtn
      sx={{
        gridColumn: `span ${span}`,
        gridRow: "span 1",
      }}

      onClick={() => addNumberToCalculator(name.toString())}
    >
      {name !== "C" ? name : <TagCross />}
    </StyledCalculatorBtn>
  );
};
