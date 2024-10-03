import { Stack } from "@mui/material";
import { StyledTextField } from "../form";
import { BagHappy, Barcode } from "iconsax-react";

interface ReportFormProductResultsProps {
  name: string;
  barCode: string;
}

export const ReportFormProductResults: React.FC<
  ReportFormProductResultsProps
> = ({ name, barCode }) => {
  return (
    <Stack className="form-product-results">
      <StyledTextField
        placeholder={name}
        disabled
        InputProps={{
          startAdornment: <BagHappy size={24} color="var(--grey-600)" />,
        }}
      />
      <StyledTextField
        placeholder={barCode}
        disabled
        InputProps={{
          startAdornment: <Barcode size={24} color="var(--grey-600)" />,
        }}
      />
    </Stack>
  );
};
