import { Stack, Button as MuiButton } from "@mui/material";
import {
  ActionsContainer,
  AsideTitle,
  IconLabelValueField,
} from "@myCash/common";
import { Clock, Printer } from "iconsax-react";
import { useTranslation } from "react-i18next";
import Button from "../form/Button";
import { useState } from "react";
import { InventoryReport, Product } from "@myCash/types";
import { Formik } from "formik";
import { useInventoryReportValidation } from "@myCash/utils";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ReportFormProductFields } from "./reportFormProductFields.component";

interface ReportInventoryAddFormProps {
  children: React.ReactNode;
  handleClose: () => void;
  setData: (data: Record<string, never>) => void;
  loading: boolean;
  handleSubmit: (values: { [key: string]: string }) => void;
  data: Record<string, never> | InventoryReport;
}

export const ReportInventoryAddForm: React.FC<ReportInventoryAddFormProps> = ({
  children,
  handleClose,
  loading,
  setData,
  handleSubmit,
  data,
}) => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<Product | undefined>(
    undefined
  );
  const { inventoryReportSchema } = useInventoryReportValidation();
  return (
    <>
      <Formik
        initialValues={{
          product_id: selectedItem?.id?.toLocaleString() || "",
          allQuantity: selectedItem?.quantity || "",
          quantity: "",
          finalPrice: selectedItem?.price || "",
          damageQuantity: "",
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(inventoryReportSchema)}
      >
        {({ handleSubmit }) => (
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
                  onClick={() => handleSubmit()}
                >
                  {t("reports.startReport")}
                </MuiButton>
              )}
            </Stack>
            <ReportFormProductFields
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            {/* report results */}
            {children}
          </>
        )}
      </Formik>
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
