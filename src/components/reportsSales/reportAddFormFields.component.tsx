import { Stack, Typography } from "@mui/material";
import {
  AsideTitle,
  CoupledButton,
  CoupledInput,
  CoupledTextField,
} from "@myCash/common";
import { reportSalesFormItems } from "@myCash/constants";
import { SalesReport } from "@myCash/types";
import { Formik } from "formik";
import { ArrowLeft3 } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface ReportAddFormFieldsProps {
  data: SalesReport | Record<string, never>;
}

export const ReportAddFormFields: React.FC<ReportAddFormFieldsProps> = ({
  data,
}) => {
  const { t } = useTranslation();
  console.log(data);
  return (
    <Stack>
      <AsideTitle title="reports.reportResult" />
      <Formik
        initialValues={{ totalSalesPrice: "", visa: "" }}
        onSubmit={() => {}}
      >
        {() => (
          <Stack gap={"1px"} mt={"12px"} className="start-report-results">
            {reportSalesFormItems.map((item) => (
              <CoupledInput
                key={item.id}
                gridStyle="5fr 8fr"
                leftField={
                  <CoupledButton
                    title={
                      <Stack
                        direction={"row"}
                        gap={"14px"}
                        alignItems={"center"}
                      >
                        <ArrowLeft3 size="32" color="var(--grey-900)" />
                        <Typography variant={"h6"} color="grey.900">
                          {t(item.title)}
                        </Typography>
                      </Stack>
                    }
                    disabled
                  />
                }
                rightField={
                  <CoupledTextField
                    name={item.id}
                    placeholder={
                      (data &&
                        (data[item.id as keyof typeof data] as string)) ||
                      "0.0"
                    }
                    order="second"
                    disableNotchedOutline
                    disabled
                  />
                }
              />
            ))}
          </Stack>
        )}
      </Formik>
    </Stack>
  );
};
