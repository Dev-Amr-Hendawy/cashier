import { useState } from "react";

import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import "./styles.scss";

interface ActiveUserSwitchProps {
  status?: number;
  handleSwitch?: (checked: boolean) => void;
  label: string;
}

export const ActiveUserSwitch: React.FC<ActiveUserSwitchProps> = ({
  status,
  handleSwitch,
  label,
}) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(status === 1 ? true : false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleSwitch && handleSwitch(event.target.checked);
  };
  return (
    <FormControl variant="outlined">
      <Stack
        className="active-user-switch container-border-padding"
        sx={{ borderColor: checked ? "#6EC531" : "var(--grey-700)" }}
      >
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
        <Typography
          component="legend"
          sx={{ color: checked ? "#6EC531" : "var(--grey-300)" }}
        >
          {t(label)}
        </Typography>
      </Stack>
    </FormControl>
  );
};
