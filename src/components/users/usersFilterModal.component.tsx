import { CommonModal, SelectInput } from "@myCash/common";
import DatePicker from "../form/DatePicker";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Shop } from "iconsax-react";
import { Formik } from "formik";
import { useGetBranches } from "@myCash/hooks";
import { format } from "date-fns";
import { FiltersHandlers } from "@myCash/types";

interface UsersFilterModalProps {
  open: boolean;
  handleClose: () => void;
  usersFilters: FiltersHandlers<{
    branch_id: string;
    date_from: string;
    date_to: string;
  }>;
}

export const UsersFilterModal: React.FC<UsersFilterModalProps> = ({
  open,
  handleClose,
  usersFilters,
}) => {
  const { t } = useTranslation();
  const handleConfirmBranchsFilters = (values: {
    branch_id: string;
    date_from: string;
    date_to: string;
  }) => {
    usersFilters.setFiltersHandler(values);
    handleClose();
  };
  const handleCancelBranchsFilters = () => {
    usersFilters.clearFilters();
    handleClose();
  };
  const { data } = useGetBranches();
  const branches =
    data?.pages?.flat().map((branch) => ({
      label: branch?.name,
      value: branch?.id?.toLocaleString(),
    })) || [];
  return (
    <Formik
      initialValues={usersFilters.filters}
      onSubmit={(values) => handleConfirmBranchsFilters(values)}
    >
      {({ handleSubmit, setFieldValue, values, resetForm }) => (
        <CommonModal
          open={open}
          hasActions
          title="filter.title"
          handleClose={handleClose}
          handleBackBtn={() => {
            resetForm();
            handleCancelBranchsFilters();
          }}
          handleConfirm={handleSubmit}
        >
          <Stack gap={"1rem"}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={1.5}
              paddingBottom={"3rem"}
            >
              <DatePicker
                value={
                  values.date_from ? new Date(values.date_from) : undefined
                }
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
                  setFieldValue(
                    "date_to",
                    date ? format(date, "yyyy-MM-dd") : ""
                  )
                }
                title={t("to")}
              />
            </Stack>
            <SelectInput
              name="branch_id"
              options={
                branches
                // branches?.map((branch) => ({
                //   label: branch?.name,
                //   value: branch?.id?.toLocaleString(),
                // })) || []
              }
              label="branch"
              startIcon={<Shop size={24} color="#2D2D2D" />}
              placeholder="branch"
            />
            {/* <FormControl className="filter-users-radio" fullWidth>
              <FormLabel>{t("client.payment")}</FormLabel>
              <RadioGroup color="secondary">
                <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
                  <CustomSelect
                    value="a"
                    label={t("client.completedInvoices")}
                  />
                  <CustomSelect value="b" label={t("client.delayedInvoices")} />
                </Stack>
              </RadioGroup>
            </FormControl> */}
          </Stack>
        </CommonModal>
      )}
    </Formik>
  );
};
