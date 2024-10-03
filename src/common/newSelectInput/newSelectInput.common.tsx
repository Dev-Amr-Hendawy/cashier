import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@mui/material";

import "./styles.scss";

interface NewSelectInputProps {
  label?: string;
  placeholder?: string;
  options: { value: string | number; label: string; icon?: string }[];
  startIcon?: React.ReactNode;
  name: string;
  defaultValue?: string | number; // New prop for default value
}

export const NewSelectInput: React.FC<NewSelectInputProps> = ({
  label,
  placeholder,
  options,
  startIcon,
  name,
  defaultValue = "0", // Default value set to "0"
}) => {
  const { t } = useTranslation();
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <>
            <TextField
              {...field}
              className="select-input"
              fullWidth
              select
              error={!!form.errors[name]}
              helperText={t(form.errors[name]?.toString() || "")}
              InputProps={{
                startAdornment: startIcon ? (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                ) : null,
                placeholder: placeholder && t(placeholder),
              }}
              SelectProps={{
                MenuProps: {
                  sx: {
                    "& .MuiMenu-paper": {
                      backgroundColor: "var(--background-color)",
                    },
                  },
                },
              }}
              InputLabelProps={{
                shrink: false,
                disableAnimation: true,
              }}
              label={label && t(label)}
              placeholder={placeholder && t(placeholder)}
              value={field.value || defaultValue} // Use field value or defaultValue
            >
              {placeholder && (
                <MenuItem disabled value={"0"}>
                  {t(placeholder)}
                </MenuItem>
              )}
              <FormHelperText error>
                {t(form.errors[name]?.toString() || "")}
              </FormHelperText>
              {options.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {option.icon && option.icon}
                    <Typography variant="body1">{option.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </>
        );
      }}
    </Field>
  );
};
