import { Field, FieldProps, useFormikContext } from "formik";

import { StyledCoupledTextField } from "./styles";
import { ChangeEvent, useEffect } from "react";

interface CoupledTextFieldProps {
  order: "first" | "second";
  name: string;
  placeholder: string;
  handleFocus?: () => void;
  isFocused?: boolean;
  isErrors?: boolean;
  handleErrorsUi?: (v: boolean) => void;
  disableNotchedOutline?: boolean;
  handleChange?: (e?: unknown) => void;
  eventHandleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
}

export const CoupledTextField: React.FC<CoupledTextFieldProps> = ({
  order,
  placeholder,
  name,
  handleFocus,
  isFocused,
  handleErrorsUi,
  isErrors,
  disableNotchedOutline,
  handleChange,
  type,
  disabled,
  endIcon,
  eventHandleChange,
}) => {
  // TODO:: optimize to react custom hook
  const { errors, touched } = useFormikContext();
  const touchedField = touched[name as keyof typeof touched];
  const fieldError = errors[name as keyof typeof errors];
  useEffect(() => {
    if (fieldError && touchedField) {
      handleErrorsUi && handleErrorsUi(true);
    } else {
      handleErrorsUi && handleErrorsUi(false);
    }
  }, [fieldError, handleErrorsUi, touchedField]);

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <StyledCoupledTextField
          {...field}
          focused={isFocused}
          disabled={disabled}
          type={type ? type : "text"}
          error={meta.touched && (!!meta.error || isErrors)}
          // error={true}
          helperText={meta.touched && !!meta.error && meta.error}
          order={order}
          disableNotchedOutline={disableNotchedOutline}
          placeholder={placeholder}
          onClick={handleFocus}
          onChange={
            handleChange
              ? (e) => {
                  field.onChange(e);
                  handleChange();
                }
              : eventHandleChange
              ? eventHandleChange
              : field.onChange
          }
          InputProps={{
            endAdornment: endIcon,
          }}
        />
      )}
    </Field>
  );
};
