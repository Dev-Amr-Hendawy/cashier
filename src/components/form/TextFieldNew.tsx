import {
  Box,
  IconButton,
  TextField as MuiTextfield,
  Stack,
  styled,
  Typography,
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
  isPercent?: boolean;
  maxLength?: number;
};

export const TextFieldNew = ({
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
  isPercent,
  multiline,
  maxLength,
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
            mainLabel ? (
              <TextFieldIconLabel
                label={mainLabel || label}
                icon={mainLabelIcon}
              />
            ) : null
          }
          // InputLabelProps={{
          //   shrink: mainLabel ? false : true,
          // }}
          multiline={multiline}
          type={fieldType}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && !!meta.error && meta.error}
          // TODO:: change to placeholder
          // placeholder={label}
          variant="outlined"
          color="primary"
          InputProps={{
            endAdornment: (
              <Stack
                display={"flex"}
                gap={"0.25rem"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                {maxLength ? (
                  <Typography
                  className="text-lg"
                    variant="h4"
                    textAlign={"center"}
                    whiteSpace={"nowrap"}
                    fontSize={"15px"}
                    style={{ fontSize: "15px !important" }}
                  >
                    {field?.value.length} / {maxLength}
                  </Typography>
                ) : null}
                {isPercent ? (
                  <Typography
                   className="text-lg"
                    variant="h4"
                    textAlign={"center"}
                    style={{ fontSize: "15px !important" }}
                    fontSize={"15px"}
                  >
                    %
                  </Typography>
                ) : null}
                {type === "password" ? (
                  <IconButton
                    onClick={handleToggle}
                    sx={{
                      backgroundColor: "transparent !important",
                      color: "var(--background-color)",
                    }}
                  >
                    {endIcon}
                  </IconButton>
                ) : endIcon ? (
                  endIcon
                ) : (
                  startIcon && (
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
                  )
                )}
              </Stack>
            ),
          }}
        />
      )}
    </Field>
  );
};

export default TextFieldNew;

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
    [theme.breakpoints.down("xl")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.down("lg")]: {
      ".MuiOutlinedInput-input":{ fontSize: "1.25rem",},
      fontSize: "1.5rem",
    },
    "& fieldset": {
      borderWidth: "2px",
      borderColor: theme.palette.grey[100],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "& svg,& .MuiTypography-root": {
      color: theme.palette.grey[600],
    },
    "&.Mui-focused svg , &.Mui-focused .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
    "&.Mui-error svg , &.Mui-error .MuiTypography-root": {
      color: theme.palette.error.main,
    },
  },
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },

  maxWidth: "unset",
  borderRadius: "100rem",
  width: "100%",

  "& .MuiOutlinedInput-input": {
    height: "20px",
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
  "& .MuiStack-root .MuiTypography-root:not(.text-lg)": {
    width: "auto",
    fontSize: "0.7rem",
    margin: "0 15px",
  },
  "& .MuiFormLabel-root.Mui-focused  .MuiStack-root .MuiTypography-root": {
    width: "auto",
    fontSize: "1rem !important",
    margin: "0 20px",
  },
  "& .MuiFormLabel-root .MuiStack-root .MuiTypography-root": {
    width: "auto",
    fontSize: "1rem !important",
    margin: "0 20px",
  },
  "& .MuiFormLabel-root": {
    // top: "-2rem",
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
