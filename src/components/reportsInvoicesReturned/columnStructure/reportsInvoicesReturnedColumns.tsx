import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { InvoiceTypeContainer } from "@myCash/components/clientsInvoices/styles";
import QuickIcon from "../../../assets/icons/Quick.svg";
import { INVOICE_TYPE } from "@myCash/constants";
import { formatMoney } from "@myCash/utils";

export const reportsInvoicesReturnedColumns = (
  t: (key: string) => string
): GridColDef[] => [
  {
    field: "invoiceNumber",
    headerName: t("invoice.invoiceNo"),
    flex: 0.75,
    sortable: false,
  },{
    field: "dateRefund",
    headerName: t("reports.returnedDate"),
    flex: 1,
    sortable: false,
    headerAlign: "center",
    align: "center",
    valueFormatter(params) {
      return params?.value?.split(" ")[0] || "-";
    },
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

<> {params.row.type === 2 ? <img src={QuickIcon} alt="Quick-Icon" /> : null}
  {params.value === INVOICE_TYPE.SIMPLE
    ? t("invoice.simpleInvoice")
    : params.value === INVOICE_TYPE.TAX
      ? t("invoice.taxInvoice")
      : t("invoice.salesInvoice")} </>
</InvoiceTypeContainer>
      );
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
    headerName: t("invoice.totalInvoice"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) =>formatMoney( params.value)
  },
  {
    field: "returnedPrice",
    headerName: t("reports.totalReturn"),
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) =>formatMoney( params.value)
  },
];
