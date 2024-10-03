import { StyledCoupledTextField } from "./styles";
interface CoupledTextFieldProps {
  order: "first" | "second";
  placeholder: string;
  handleFocus?: () => void;
  isFocused?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}

export const ControlledCoupledTextField: React.FC<CoupledTextFieldProps> = ({
  order,
  placeholder,
  handleFocus,
  isFocused,
  handleChange,
  value,
}) => {
  return (
    <StyledCoupledTextField
      focused={isFocused}
      order={order}
      placeholder={placeholder}
      onClick={handleFocus}
      onChange={handleChange}
      value={value}
    />
  );
};
