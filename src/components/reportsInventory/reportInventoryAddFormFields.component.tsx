import { ButtonBase, Stack, Typography } from "@mui/material";
import {
  AsideTitle,
  CoupledButton,
  CoupledInput,
  CoupledTextField,
} from "@myCash/common";
import { reportInventoryFormItems } from "@myCash/constants";
import { InventoryReport, InventoryReportForm } from "@myCash/types";
import { useFormikContext } from "formik";
import { ArrowLeft3 } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { DamagedQuantityInput } from "./damagedQuantityInput.component";
import "./styles.scss";

interface ReportInventoryAddFormFieldsProps {
  data: InventoryReport | Record<string, never>;
  haveDamaged: boolean;
  setHaveDamaged?: (value: boolean) => void;
  isReportResult?: boolean;
}

export const ReportInventoryAddFormFields: React.FC<
  ReportInventoryAddFormFieldsProps
> = ({ data, haveDamaged, setHaveDamaged, isReportResult }) => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<InventoryReportForm>();
  return (
    <Stack>
      {!isReportResult && <AsideTitle title="reports.reportResult" />}
      <Stack gap={"1px"} mt={"12px"} className="start-report-results">
        {reportInventoryFormItems.map((item) => {
          if (item.id === "damageQuantity" && haveDamaged) {
            return (
              <DamagedQuantityInput
                key={item.id}
                item={item}
                data={data}
                haveDamaged={haveDamaged}
                setHaveDamaged={() => setHaveDamaged && setHaveDamaged(false)}
              />
            );
          } else if (item.id === "damageQuantity" && !haveDamaged) {
            return null;
          }
          if (item.id === "quantity" && !haveDamaged) {
            return null;
          }
          return (
            <CoupledInput
              key={item.id}
              gridStyle="5fr 8fr"
              leftField={
                <CoupledButton
                  title={
                    <Stack direction={"row"} gap={"14px"} alignItems={"center"}>
                      <ArrowLeft3 size="24" color="var(--grey-900)" />
                      <Typography variant={"h6"} color="grey.900">
                        {t(item.title)}
                      </Typography>
                    </Stack>
                  }
                  disabled={item.id === "quantity" && !data?.id ? false : true}
                />
              }
              rightField={
                <CoupledTextField
                  name={item.id}
                  placeholder={
                    (
                      data &&
                      (data[item.id as keyof typeof data] as unknown as string)
                    )?.toString() || "0.0"
                  }
                  order="second"
                  disableNotchedOutline
                  eventHandleChange={(e) => {
                    if (item.id === "quantity") {
                      const dmgQuantity =
                        Number(values?.quantity) >= 0
                          ? Number(values.allQuantity) -
                            Number(e?.target?.value)
                          : 0;
                      setFieldValue(
                        "damageQuantity",
                        dmgQuantity >= 0 ? dmgQuantity : 0
                      );
                      setFieldValue("quantity", e?.target?.value);
                    }
                  }}
                  disabled={item.id === "quantity" && !data?.id ? false : true}
                  endIcon={
                    item.id === "allQuantity" &&
                    values?.product_id &&
                    !haveDamaged && (
                      <ButtonBase
                        color="secondary"
                        onClick={() => setHaveDamaged && setHaveDamaged(true)}
                        className="end-icon-button end-icon-quantity"
                      >
                        {t("reports.enterDamagedQuantity")}
                      </ButtonBase>
                    )
                  }
                />
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
