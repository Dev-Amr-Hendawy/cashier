import "./styles.scss";

import { ChangeEvent, useState } from "react";
import {
  ClickAwayListener,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

interface CalculatorDoubleTextFieldProps {
  name: string;
  value: string;
  label: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const CalculatorDoubleTextField: React.FC<
  CalculatorDoubleTextFieldProps
> = ({ name, label, onClick, value, onChange, disabled }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setIsFocused(false)}>
      <FormControl className="calculator-double-textfield">
        <InputLabel focused={isFocused}>{label}</InputLabel>
        <TextField
          name={name}
          value={value}
          InputLabelProps={{ disableAnimation: true, shrink: false }}
          placeholder="0.0"
          onClick={() => {
            setIsFocused(true);
            onClick();
          }}
          onChange={onChange}
          disabled={disabled}
        />
      </FormControl>
    </ClickAwayListener>
  );
};
