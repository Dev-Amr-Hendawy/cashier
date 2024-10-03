import { Stack, Typography } from "@mui/material";
import {
  AsideTitle,
  CoupledButton,
  CoupledInput,
  CoupledTextField,
} from "@myCash/common";
import { declarationResultItems } from "@myCash/constants";
import { ReportResults } from "@myCash/types";
import { Formik } from "formik";
import { ArrowLeft3 } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface DeclarationResultFieldsProps {
  data: ReportResults | Record<string, never>;
}

export const DeclarationResultFields: React.FC<
  DeclarationResultFieldsProps
> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <AsideTitle title="reports.reportResult" />
      <Formik
        initialValues={{ totalSalesPrice: "", visa: "" }}
        onSubmit={() => {}}
      >
        {() => (
          <Stack gap={"1px"} mt={"12px"} className="start-report-results">
            {declarationResultItems.map((item) => (
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
                      (
                        data &&
                        (data[
                          item.id as keyof typeof data
                        ] as unknown as string)
                      )?.toString() || "0.0"
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
