import { FormControlLabel, Radio, Stack } from "@mui/material";
import { TickSquare } from "iconsax-react";
import { ChangeEvent } from "react";
import "./styles.scss";

interface CustomSelectProps {
  value: string;
  label: string;
  handleChange?: (_e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  checked?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, label, handleChange, checked = false }) => {
  return (
    <Stack className="custom-select-radio">
      <FormControlLabel
        value={value}
        control={
          <Radio
            checked={checked}
            onChange={handleChange}
            icon={<TickSquare variant="TwoTone" path="0" />}
            checkedIcon={<TickSquare color="green" variant="Bold" />}
            disableRipple
          />
        }
        label={label}
      />
    </Stack>
  );
};
