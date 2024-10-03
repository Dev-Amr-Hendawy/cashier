import { Button as MuiButton, Stack } from "@mui/material";
import {
  ActionsContainer,
  AsideTitle,
  BackDrop,
  CommonModal,
} from "@myCash/common";
import { CommonModalProps } from "@myCash/types";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../form";
import { useEffect, useState } from "react";
import { ReportAddFormFields } from "./reportAddFormFields.component";
import { useAddReport } from "@myCash/hooks";
import { format } from "date-fns";
import Button from "../form/Button";
import { Printer } from "iconsax-react";

interface ReportAddFormProps extends CommonModalProps {}

export const ReportAddForm: React.FC<ReportAddFormProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const [dateFilters, setDateFilters] = useState<{
    date_from: string;
    date_to: string;
  }>({
    date_from: "",
    date_to: "",
  });
  const [data, setData] = useState({});
  const { data: reportData, mutate, isPending } = useAddReport();
  //   use effect to handle reset data on cancel
  useEffect(() => {
    reportData && setData(reportData?.data?.data);
  }, [reportData]);
  if (isPending) return <BackDrop open={isPending} />;
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title="reports.salesReport"
      handleClose={handleClose}
      removePadding
    >
      {/* start report */}
      <Stack>
        <AsideTitle title="process" />
        <MuiButton
          className="start-report-modal"
          variant="contained"
          onClick={() =>
            mutate({
              date_from: dateFilters.date_from,
              date_to: dateFilters.date_to,
            })
          }
        >
          {t("reports.startReport")}
        </MuiButton>
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
      <ReportAddFormFields
        //   data={reportData?.data?.data}
        data={data ? data : {}}
      />
      {/* actions */}
      <ActionsContainer spacing={2} direction="row" padding={"0 1.5rem"}>
        <Button
          text={t("reports.saveReport")}
          variant="contained"
          color="primary"
          loading={isPending}
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
    </CommonModal>
  );
};
