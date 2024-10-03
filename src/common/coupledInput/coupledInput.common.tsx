import { CSSProperties, ReactElement, cloneElement, useState } from "react";
import { StyledContainer } from "./styles";
import { ClickAwayListener } from "@mui/material";
interface CoupledTextFieldProps {
  leftField: ReactElement;
  rightField: ReactElement;
  gridStyle?: string;
  leftFieldStyle?: CSSProperties;  // New prop for left field styles
  rightFieldStyle?: CSSProperties;
}

export const CoupledInput: React.FC<CoupledTextFieldProps> = ({
  leftField,
  rightField,
  gridStyle,  leftFieldStyle,  // Add the new style prop
  rightFieldStyle,
}) => {
  const [isFoucused, setIsFoucused] = useState(false);
  const [isErrors, setIsErrors] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsFoucused(false);
      }}
      disableReactTree={false}
    >
      <StyledContainer gridStyle={gridStyle}>
        {/* TODO::try with HOC */}
        {cloneElement(leftField, {
           style: leftFieldStyle,
          isFocused: isFoucused,
          isErrors: isErrors,
          handleFocus: () => setIsFoucused(true),
          handleErrorsUi: setIsErrors,
        })}
        {cloneElement(rightField, {
            style: rightFieldStyle,
          isFocused: isFoucused,
          isErrors: isErrors,
          handleFocus: () => setIsFoucused(true),
          handleErrorsUi: setIsErrors,
        })}
      </StyledContainer>
    </ClickAwayListener>
  );
};
