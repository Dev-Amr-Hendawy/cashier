import {
  Box,
  IconButton,
  TextField as MuiTextfield,
  styled,
} from "@mui/material";
import { Field, FieldProps } from "formik";

import { TextFieldIconLabel } from "../../common";
import { useState } from "react";

type Props = {
  name: string;
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
  handleChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
};

export const TextField = ({
  placeholder,
  name,
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
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <StyledTextField
          {...field}
          onChange={
            handleChange
              ? (e) => {
                  field.onChange(e);
                  handleChange();
                }
              : field.onChange
          }
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
          error={meta.touched && !!meta.error}
          helperText={meta.touched && !!meta.error && meta.error}
          // TODO:: change to placeholder
          placeholder={label}
          variant="outlined"
          color="primary"
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
      )}
    </Field>
  );
};

export default TextField;

export const StyledTextField = styled(MuiTextfield)(({ theme }) => ({
  "&.MuiTextField-root": {
    // paddingBottom: ".5rem",
    "& .MuiFormHelperText-root": {
      // position: "absolute",
      // bottom: "-1.25rem",
    },
  },
  "& .MuiButtonBase-root": {
    backgroundColor: theme.palette.grey[400],
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "100rem",
    // gap: "1rem",
    paddingLeft: "1.5rem",
    paddingRight: "1rem",
    backgroundColor: theme.palette.mode === "light" ? "var(--grey-0)" : "black",
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[200],
      "& fieldset": {
        borderColor: theme.palette.grey[200],
      },
    },

    "& fieldset": {
      borderWidth: "2px",
      borderColor: theme.palette.grey[100],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "& svg": {
      color: theme.palette.grey[600],
    },
    "&.Mui-focused svg": {
      color: theme.palette.primary.main,
    },
  },
  maxWidth: "unset",
  borderRadius: "100rem",
  width: "100%",

  "& .MuiOutlinedInput-input": {
    height: "1.5rem",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "1rem .75rem",
    //breakpoints
    [theme.breakpoints.down("xl")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.5rem",
    },
  },
  "& .MuiFormLabel-root": {
    top: "-3rem",
  },
  // hide arrows for type number
  /* Chrome, Safari, Edge, Opera */
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  /* Firefox */
  " input[type=number]": {
    " -moz-appearance": "textfield",
  },
}));