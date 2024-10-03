import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { INVOICE_TYPE, SORTING } from "@myCash/constants";
import { TablePaymentStatusCell } from "@myCash/common";
import { ArrangeVertical, Back } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setInvoicesSort } from "@myCash/lib";
import { InvoiceTypeContainer } from "../styles";

import QuickIcon from "../../../assets/icons/Quick.svg";
export const clientsInvoicesColumns = (
  t: (key: string) => string
): GridColDef[] => [
    {
      field: "invoiceNumber",
      headerName: t("invoice.invoiceNo"),
      flex: 1,
      sortable: false,

      renderCell: (params: GridRenderCellParams) => (
        <div style={{ paddingInline: "25px" }}>{params.value}</div>
      ),
      renderHeader() {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <IconSort />
            {t("invoice.invoiceNo")}{" "}
          </div>
        );
      },
    },
    // {
    //   field: "invoiceOrder",
    //   headerName: t("invoice.invoiceOrder"),
    //   flex: 0.75,
    //   sortable: false,
    // },
    {
      field: "invoiceType",
      headerName: t("invoice.type"),
      flex: 2,
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
    },

    {
      field: "products",
      headerName: t("productsNo"),
      type: "string",
      flex: 0.7,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <div>{params.value?.length}</div>
      ),
    },
    {
      field: "date",
      headerName: t("timing"),
      type: "string",
      flex: 1.5,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paymentStatus",
      headerName: t("status"),
      type: "string",
      flex: 1.5,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <TablePaymentStatusCell status={params.value} />
      ),
    },
  ];

const IconSort = () => {
  const invoicesState = useSelector((state: RootState) => state.invoices);
  const dispatch = useDispatch();

  return (
    <ArrangeVertical
      size={20}
      color={
        invoicesState?.filters.sort === SORTING.ASC
          ? "var(--grey-600)"
          : "var(--primary-main)"
      }
      style={{ cursor: "pointer" }}
      onClick={() => {
        dispatch(
          setInvoicesSort(
            invoicesState.filters.sort === SORTING.ASC
              ? SORTING.DESC
              : SORTING.ASC
          )
        );
      }}
    />
  );
};
