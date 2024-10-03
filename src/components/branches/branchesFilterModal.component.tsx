import { Formik } from "formik";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import { CommonModal, SelectInput } from "@myCash/common";
import { DatePicker, TextField } from "@myCash/components";
import { FiltersHandlers } from "@myCash/types";

interface BranchesFilterModalProps {
  open: boolean;
  handleClose: () => void;
  branchesFilters: FiltersHandlers<{
    date_from: string;
    date_to: string;
    status: string;
    city: string;
  }>;
}

export const BranchesFilterModal: React.FC<BranchesFilterModalProps> = ({
  open,
  handleClose,
  branchesFilters,
}) => {
  const { t } = useTranslation();

  const handleCancelBranchsFilters = () => {
    branchesFilters.clearFilters();
    handleClose();
  };
  return (
    <Formik
      initialValues={branchesFilters.filters}
      onSubmit={(values) => {
        branchesFilters.setFiltersHandler(values);
        handleClose();
      }}
    >
      {({ handleSubmit, setFieldValue, values, resetForm }) => (
        <CommonModal
          open={open}
          hasActions
          title="filter.title"
          handleClose={handleClose}
          handleConfirm={handleSubmit}
          handleBackBtn={() => {
            resetForm();
            handleCancelBranchsFilters();
          }}
        >
          <Stack direction="row" justifyContent="space-between" spacing={1.5}>
            <DatePicker
              value={values.date_from ? new Date(values.date_from) : undefined}
              onChange={(date) =>
                setFieldValue(
                  "date_from",
                  date ? format(date, "yyyy-MM-dd") : ""
                )
              }
              title={t("from")}
            />
            <DatePicker
              value={
                values.date_to.length ? new Date(values.date_to) : undefined
              }
              onChange={(date) =>
                setFieldValue("date_to", date ? format(date, "yyyy-MM-dd") : "")
              }
              title={t("to")}
            />
          </Stack>
          <Typography variant="h6" color={"var(--grey-600)"}>
            {t("branch")}
          </Typography>
          <SelectInput
            name="status"
            options={[
              { label: t("active"), value: "1" },
              { label: t("inactive"), value: "2" },
            ]}
            placeholder="status"
          />
          <TextField label="city" name="city" placeholder="city" />
        </CommonModal>
      )}
    </Formik>
  );
};
