import { FormControl } from "@mui/material";
import { CustomRadioGroup, RadioLabel } from "..";

type GenericRadioGroupProps = {
  title: string;
  icon: React.ReactNode;
  inputs: { value: string; label: string }[];
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const GenericRadioGroup: React.FC<GenericRadioGroupProps> = ({
  title,
  icon,
  inputs,
  handleChange,
  value,
}) => {
  return (
    <FormControl color="secondary" sx={{ gap: ".5rem" }}>
      <RadioLabel title={title} icon={icon} />
      <CustomRadioGroup
        value={value}
        inputs={inputs}
        handleChange={handleChange}
      />
    </FormControl>
  );
};
