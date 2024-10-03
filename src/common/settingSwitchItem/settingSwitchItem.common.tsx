import {
  ButtonBase,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import "./styles.scss";

interface SettingSwitchItemProps {
  icon?: ReactNode;
  handleSwitch?: (checked: boolean) => void;
  name: string;
  status: number;
}

export const SettingSwitchItem: React.FC<SettingSwitchItemProps> = ({
  icon,
  handleSwitch,
  name,
  status,
}) => {
  const [checked, setChecked] = useState(!!status);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleSwitch && handleSwitch(event.target.checked);
  };
  return (
    <ButtonBase className="setting-switch-item">
      <Stack direction={"row"} gap={"1rem"}>
        {icon}
        <Typography variant="h6" color="grey.300">
          {name}
        </Typography>
      </Stack>
      <Stack>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              color="secondary"
              size="small"
            />
          }
          label=""
        />
      </Stack>
    </ButtonBase>
  );
};
