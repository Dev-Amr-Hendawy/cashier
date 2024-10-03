import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { InvoiceTypeContainer } from "@myCash/components/clientsInvoices/styles";
import QuickIcon from "../../../assets/icons/Quick.svg";
import {  Back } from "iconsax-react";
import { INVOICE_TYPE } from "@myCash/constants";
import { formatMoney } from "@myCash/utils";

export const reportsInvoicesSellColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "invoiceNumber",
    headerName: t("invoice.invoiceNo"),
    flex: 0.75,
    sortable: false,
  },{
    field: "invoiceType",
    headerName: t("invoice.type"),
    flex: 1.5,
    sortable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams) => {
      return (
        <InvoiceTypeContainer>

          <> {params.row.type === 2 ? <img src={QuickIcon} alt="Quick-Icon" /> : null}{params.row.isReturn === 1 ? <Back color="var(--primary-main)" /> : null}
            {params.value === INVOICE_TYPE.SIMPLE
              ? t("invoice.simpleInvoice")
              : params.value === INVOICE_TYPE.TAX
                ? t("invoice.taxInvoice")
                : t("invoice.salesInvoice")} </>
        </InvoiceTypeContainer>
      );
    },
  }, {
    field: "date",
    headerName: t("date"),
    flex: 1.2,
    sortable: false, align: "center", headerAlign: "center",
    valueFormatter(params) {
      return params?.value?.split(" ")[0] || "-";
    },
  },
  {
    field: "paymentType",
    headerName: t("paymentMethod.title"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell(params) {
      let content;
      switch (params?.value) {
        case 1:
          content = t("payment.cash");
          break;
        case 2:
          content = t("payment.visa");
          break;
        case 3:
          content = t("payment.credit");
          break;
        case 4:
          content = t("payment.payment.cash-visa");
          break;
        case 5:
          content = t("payment.payment.cash-credit");
          break;
        case 6:
          content = t("payment.installment");
          break;
        default:
          content = null;
      }
      return <div>{content}</div>;
    },
  },
  {
    field: "totalPrice",
    headerName: t("invoice.total"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) =>formatMoney( params.value)
  },
 
];
