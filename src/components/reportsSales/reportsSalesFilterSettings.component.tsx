import {
  FormControl,
  FormControlLabel,

  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { FiltersHandlers } from "@myCash/types";
import { SelectBranch } from "@myCash/common";

interface ReportsSalesFilterSettingsProps {
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  salesFilters: FiltersHandlers<{
    date_to: string;
    date_from: string;
    type: string;
    sort: string;
    branch_id: string;
  }>;
}


export const ReportsSalesFilterSettings: React.FC<
  ReportsSalesFilterSettingsProps
> = ({ salesFilters, selectedValue, handleChange }) => {
  const { t } = useTranslation();
  const {  setFilterHandler } = salesFilters;
  return (
    <Stack className="reports-sales-settings-filters" direction={"row"}>
   <SelectBranch   setFilterHandler={(key,value) =>
                  setFilterHandler({  [key]: value})               
                 } />
      <Stack className="filters-type" alignItems={"center"} direction={"row"}>
        <Typography sx={{ color: "var(--primary-main)" }}>
          {" "}
          {t("reports.filter.searchMethod")}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="date"
              
              control={
                <Radio
                  checked={selectedValue === "date"}
                  onChange={handleChange}
                />
              }
              label={t("reports.filter.byDate")}
            />
            <FormControlLabel
              value="time-period"
              control={
                <Radio
                  checked={selectedValue === "time-period"}
                  onChange={handleChange}
                />
              }
              label={t("reports.filter.timePeriod")}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
};


