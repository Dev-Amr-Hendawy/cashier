import { Radio } from "@mui/material";
import checkedIcon from "../../assets/icons/radio-checked.svg";
import { StyledFormControlLabel } from "./styles";
import { NotChecked } from "@myCash/assets";
import { useColorMode } from "@myCash/hooks";

export const RadioButton: React.FC<{
  value: number | string;
  label: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, label, checked, onChange }) => {
  const { isLightMode } = useColorMode();
  return (
    <StyledFormControlLabel
      label={label}
      value={value}
      checked={checked}
      control={
        <Radio
          checked={checked}
          icon={
            <NotChecked stroke={isLightMode ? "#2D2D2D" : "var(--grey-900)"} />
          }
          checkedIcon={<img src={checkedIcon} alt="checked" />}
          color="secondary"
          onChange={onChange}
        />
      }
    />
  );
};
