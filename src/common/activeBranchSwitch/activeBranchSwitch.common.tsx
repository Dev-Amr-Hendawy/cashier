import {
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";

interface ActiveBranchSwitchProps {
  status: number;
  handleSwitch?: (checked: boolean) => void;
}

export const ActiveBranchSwitch: React.FC<ActiveBranchSwitchProps> = ({
  status,
  handleSwitch,
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
        className="active-branch-switch "
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
          {checked ? t("branches.active") : t("branches.inactive")}
        </Typography>
      </Stack>
    </FormControl>
  );
};
