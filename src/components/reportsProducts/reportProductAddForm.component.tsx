import { Stack, Button as MuiButton } from "@mui/material";
import {
  ActionsContainer,
  AsideTitle,
  IconLabelValueField,
} from "@myCash/common";
import { Clock, Printer } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../form";
import Button from "../form/Button";
import { useState } from "react";
import { format } from "date-fns";
import { ProductReport } from "@myCash/types";

interface ReportProductsAddFormProps {
  children: React.ReactNode;
  handleClose: () => void;
  setData: (data: Record<string, never>) => void;
  loading: boolean;
  handleSubmit: (values: { [key: string]: string }) => void;
  data: Record<string, never> | ProductReport;
}

export const ReportProductsAddForm: React.FC<ReportProductsAddFormProps> = ({
  children,
  handleClose,
  loading,
  setData,
  handleSubmit,
  data,
}) => {
  const { t } = useTranslation();
  const [dateFilters, setDateFilters] = useState<{
    date_from: string;
    date_to: string;
  }>({
    date_from: "",
    date_to: "",
  });
  return (
    <>
      <Stack>
        <AsideTitle
          title={data?.id ? t("reports.report") : t("process")}
          value={data?.id ? `${data.id}#` : ""}
        />
        {data?.id ? (
          <Stack className="report-result-date">
            <IconLabelValueField
              label="test"
              icon={<Clock color="var(--grey-900)" size={24} />}
              value="value"
            />
          </Stack>
        ) : (
          <MuiButton
            className="start-report-modal"
            variant="contained"
            onClick={() =>
              handleSubmit({
                date_from: dateFilters.date_from,
                date_to: dateFilters.date_to,
              })
            }
          >
            {t("reports.startReport")}
          </MuiButton>
        )}
      </Stack>
      {/* date filters */}
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={1.5}
        padding={"0 1.5rem"}
      >
        <DatePicker
          onChange={(date) =>
            setDateFilters({
              ...dateFilters,
              date_from: format(date, "yyyy-MM-dd"),
            })
          }
          title={t("from")}
          value={
            dateFilters.date_from ? new Date(dateFilters.date_from) : undefined
          }
        />
        <DatePicker
          onChange={(date) =>
            setDateFilters({
              ...dateFilters,
              date_to: format(date, "yyyy-MM-dd"),
            })
          }
          title={t("to")}
          value={
            dateFilters.date_to ? new Date(dateFilters.date_to) : undefined
          }
          disableFuture
        />
      </Stack>
      {/* report results */}
      {/* <ReportProductAddFormFields data={data ? data : {}} /> */}
      {children}
      {/* actions */}
      <ActionsContainer spacing={2} direction="row" padding={"0 1.5rem"}>
        <Button
          text={t("reports.saveReport")}
          variant="contained"
          color="primary"
          loading={loading}
          onClick={() => {
            handleClose();
            setData({});
          }}
        />
        <Button
          text={t("print")}
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClose();
          }}
          startIcon={<Printer color="var(--primary-main)" size={24} />}
        />
      </ActionsContainer>
    </>
  );
};
