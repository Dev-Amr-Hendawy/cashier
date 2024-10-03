import { MenuItem } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { IoChevronDown } from "react-icons/io5";
import { TextFieldIconLabel } from "..";
import { MenuStyles, StyledCoupledSelectTextField } from "./styles";
import { useEffect } from "react";

interface CoupledSelectTextFieldProps {
  order: string;
  name: string;
  placeholder?: string;
  menuItems?: () => React.ReactNode;
  mainLabel?: string;
  mainLabelIcon?: React.ReactNode;
  handleFocus?: () => void;
  isFocused?: boolean;
  isErrors?: boolean;
  handleErrorsUi?: (v: boolean) => void;
}

export const CoupledSelect: React.FC<CoupledSelectTextFieldProps> = ({
  order,
  name,
  placeholder,
  menuItems,
  mainLabel,
  mainLabelIcon,
  handleFocus,
  isFocused,
  isErrors,
  handleErrorsUi,
}) => {
  // TODO:: optimize to react custom hook
  const { errors } = useFormikContext();
  const fieldError = errors[name as keyof typeof errors];
  useEffect(() => {
    if (fieldError) {
      handleErrorsUi && handleErrorsUi(true);
    } else {
      handleErrorsUi && handleErrorsUi(false);
    }
  }, [fieldError, handleErrorsUi]);
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <StyledCoupledSelectTextField
          {...field}
          focused={isFocused}
          onClick={handleFocus}
          label={
            order == "first" && mainLabel ? (
              <TextFieldIconLabel label={mainLabel} icon={mainLabelIcon} />
            ) : null
          }
          error={(meta.touched && !!meta.error) || isErrors}
          helperText={meta.touched && !!meta.error && meta.error}
          color="secondary"
          className="select-custom"
          SelectProps={{
            IconComponent: IoChevronDown,
            displayEmpty: true,
            MenuProps: {
              sx: MenuStyles,
              TransitionProps: {
                onEntered(isAppearing) {
                  if (isAppearing) {
                    handleFocus && handleFocus();
                  }
                },
              },
            },
          }}
          InputLabelProps={{
            shrink: false,
          }}
          select
          order={order}
          value={field.value}
        >
          {placeholder && (
            <MenuItem
              value=""
              disabled
              sx={{
                display: "none",
              }}
            >
              {placeholder}
            </MenuItem>
          )}
          {menuItems ? menuItems() : ""};
        </StyledCoupledSelectTextField>
      )}
    </Field>
  );
};
