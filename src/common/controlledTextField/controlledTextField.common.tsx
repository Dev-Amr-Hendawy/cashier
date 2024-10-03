import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { TextFieldIconLabel } from "../../common";
import { StyledTextField } from "../../components/form/TextField";

type Props = {
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: string;
  mainLabel?: string;
  mainLabelIcon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ControlledTextField = ({
  placeholder,
  label,
  startIcon,
  type = "text",
  endIcon,
  mainLabel,
  mainLabelIcon,
  disabled,
  value,
  onChange,
}: Props) => {
  const [fieldType, setFieldType] = useState(type);
  const handleToggle = () => {
    setFieldType((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <StyledTextField
      disabled={disabled}
      // TODO:: change to label ya "Naeem"!!!!
      label={
        placeholder && mainLabel ? (
          <TextFieldIconLabel label={mainLabel} icon={mainLabelIcon} />
        ) : null
      }
      InputLabelProps={{
        shrink: mainLabel ? false : true,
      }}
      type={fieldType}
      // TODO:: change to placeholder
      placeholder={label}
      variant="outlined"
      color="secondary"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
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
            <IconButton onClick={handleToggle}>{endIcon}</IconButton>
          ) : (
            endIcon
          ),
      }}
    />
  );
};
