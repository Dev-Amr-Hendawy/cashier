import {
  Box,
  IconButton,
  //   TextField as MuiTextfield,
  //   styled,
} from "@mui/material";
// import { Field, FieldProps } from "formik";

import { TextFieldIconLabel } from "../../common";
import { ChangeEvent, useState } from "react";
import { StyledTextField } from "@myCash/components";

type Props = {
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: string;
  mainLabel?: string;
  mainLabelIcon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  readonly?: boolean;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  multiline?: boolean;
};

export const NativeTextField = ({
  placeholder,
  label,
  startIcon,
  type = "text",
  endIcon,
  mainLabel,
  mainLabelIcon,
  disabled,
  defaultValue,
  readonly,
  handleChange,
  multiline,
}: Props) => {
  const [fieldType, setFieldType] = useState(type);
  const handleToggle = () => {
    setFieldType((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    // <Field name={name}>
    //   {({ field, meta }: FieldProps) => (
    <StyledTextField
      //   {...field}
      onChange={(e) => handleChange && handleChange(e)}
      disabled={disabled || readonly}
      defaultValue={defaultValue && defaultValue}
      // TODO:: change to label"!!!!
      label={
        placeholder && mainLabel ? (
          <TextFieldIconLabel label={mainLabel} icon={mainLabelIcon} />
        ) : null
      }
      InputLabelProps={{
        shrink: mainLabel ? false : true,
      }}
      multiline={multiline}
      type={fieldType}
      //   error={meta.touched && !!meta.error}
      //   helperText={meta.touched && !!meta.error && meta.error}
      // TODO:: change to placeholder
      placeholder={label}
      variant="outlined"
      color="secondary"
      InputProps={{
        startAdornment: startIcon && (
          <Box
            sx={{
              width: "2rem",
              height: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "contain",
              },
              "& svg": {
                width: "100%",
                height: "100%",
                objectFit: "contain",
                // "& g": {
                //   stroke: "currentColor",
                // },
                // "& path": {
                //   stroke: "currentColor",
                // },
              },
            }}
          >
            {startIcon}
          </Box>
        ),
        endAdornment:
          type === "password" ? (
            <IconButton
              onClick={handleToggle}
              sx={{
                backgroundColor: "transparent !important",
                color: "var(--background-color)",
              }}
            >
              {endIcon}
            </IconButton>
          ) : (
            endIcon
          ),
      }}
    />
    //   )}
    // </Field>
  );
};
