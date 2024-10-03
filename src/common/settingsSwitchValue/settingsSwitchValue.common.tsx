import {
  ButtonBase,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import "./styles.scss";

interface SettingSwitchValueProps {
  icon?: ReactNode;
  handleSwitch?: (checked: boolean) => void;
  name: string;
  status: number;
  value?: string;
}

export const SettingSwitchValue: React.FC<SettingSwitchValueProps> = ({
  icon,
  handleSwitch,
  name,
  status,
  value,
}) => {
  const [checked, setChecked] = useState(status === 1 ? true : false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleSwitch && handleSwitch(event.target.checked);
  };
  return (
    <ButtonBase className="setting-switch-value">
      <Stack gap={"1.5rem"} width={"100%"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={"1rem"}>
            {icon}
            <Typography variant="h6" color="grey.300">
              {name}
            </Typography>
          </Stack>
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
        {value && (
          <Typography variant="body2" className="setting-value-typography">
            {value}
          </Typography>
        )}
      </Stack>
    </ButtonBase>
  );
};
