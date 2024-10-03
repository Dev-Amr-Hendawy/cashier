import { RadioButton } from "../radioButton";
import { RadioGroup } from "@mui/material";

type RadioGroupProps = {
  color?: "primary" | "secondary";
  inputs: { value: string; label: string }[];
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

export const CustomRadioGroup: React.FC<RadioGroupProps> = ({
  inputs,
  color = "secondary",
  value,
  handleChange,
}) => {
  return (
    <RadioGroup color={color} sx={{ gap: ".5rem" }}>
      {inputs.map((input) => (
        <RadioButton
          checked={input.value === value}
          key={input.value}
          value={input.value}
          label={input.label}
          onChange={handleChange}
          
        />
      ))}
    </RadioGroup>
  );
};
