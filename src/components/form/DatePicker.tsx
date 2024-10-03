import { Stack, Typography } from "@mui/material";

import { Calendar } from "iconsax-react";
import { ElementType } from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  title?: string;
  fullWidth?: boolean;
  icon?: ElementType<keyof JSX.IntrinsicElements>;
  placeholder?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  title,
  fullWidth,
  icon,
  placeholder,
  disablePast = false,
  disableFuture = false,
}) => {
  // TODO:: handle setvalue time error
  return (
    <Stack
      spacing={1}
      direction={"row"}
      alignItems="center"
      className="date-picker-container"
    >
      {title && (
        <Typography variant="h5" color="grey.400">
          {title}
        </Typography>
      )}
      {/* add 500px borderRadius for the input field */}
      <MuiDatePicker
        disablePast={disablePast}
        disableFuture={disableFuture}
        value={value || null}
        onChange={(date) => {
          if (date) onChange(date);
        }}
        slots={{
          openPickerIcon: icon ? icon : Calendar,
        }}
        slotProps={{
          layout: {
            sx: {
              "& .MuiDateCalendar-root": {
                backgroundColor: "var(--background-color)",
              },
            },
          },
          textField: {
            placeholder: placeholder ? placeholder : "DD/MM/YYYY",
            sx: {
              "&.MuiFormControl-root": {
                width: fullWidth ? "100%" : "unset",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "500px",
                borderColor: "grey.300",
                flexDirection: "row-reverse",
              },
            },
          },
        }}
      />
    </Stack>
  );
};

export default DatePicker;
