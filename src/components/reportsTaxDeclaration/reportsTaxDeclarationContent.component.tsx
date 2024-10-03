import { HeaderWithBack, ScrollContainer, Table } from "@myCash/common";
import { useDatePickerHandler, useGetTaxDeclaration } from "@myCash/hooks";
import { useTranslation } from "react-i18next";
import { declarationReportsColumns } from "./columnStructure/declarationReportsColumns";
import {
  DeclarationResultModal,
  ReportsDeclarationHeader,
} from "@myCash/components";
import { CircularProgress, Stack } from "@mui/material";
import { useState } from "react";

interface ReportsTaxDeclarationContentProps {}

export const ReportsTaxDeclarationContent: React.FC<
  ReportsTaxDeclarationContentProps
> = () => {
  const { t } = useTranslation();
  const [openResult, setOpenResult] = useState(false);
  const taxDeclarationColumns = declarationReportsColumns(t, () =>
    setOpenResult(true)
  );
  const {
    filters,
    setDateFilters,
    handleResetDateFilters: resetParentFilters,
  } = useDatePickerHandler();
  const { data, isPending } = useGetTaxDeclaration(filters);

  console.log(data);
  return (
    <ScrollContainer>
      <HeaderWithBack title={t("reports.taxdeclaraton")} />
      <ReportsDeclarationHeader
        setDateFilters={setDateFilters}
        resetParentFilters={resetParentFilters}
      />
      {isPending ? (
        <Stack margin={"10% 40%"}>
          <CircularProgress size={70} />
        </Stack>
      ) : (
        <Table
          columns={taxDeclarationColumns}
          rows={data ? [{ ...data, id: Math.random() }] : []}
        />
      )}
      {/* Re-shape data for result fields keys */}
      <DeclarationResultModal
        data={
          data
            ? {
                buyTax: data?.buy_invoices?.total_price,
                buyNoTax: data?.buy_invoices?.total_without_tax,
                sellTax: data?.sale_invoices?.total_price,
                sellNoTax: data?.sale_invoices?.total_without_tax,
                total: data?.$tax_total_price,
              }
            : {}
        }
        handleClose={() => setOpenResult(false)}
        open={openResult}
      />
    </ScrollContainer>
  );
};
