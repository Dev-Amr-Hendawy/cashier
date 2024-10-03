import { IInvoiceNotification, Product } from "@myCash/types/types";
import {
  QrCodesContainer,
  StyledDivider,
  StyledInvoiceContainer,
  StyledSeparator,
  StyledTableHeader,
  StyledTableItem,
  SummaryGrid,
} from "./styles";
import { Stack, Typography } from "@mui/material";
import {
  formatMoney,
  getInvoicePaymentType,
} from "@myCash/utils";

import invoiceLogo from "../../assets/icons/invoice-icon.svg";
// import qrLogo from "../../assets/icons/qr-code-icon.svg";
import { useTranslation } from "react-i18next";
import { InvoiceQrCode, InvoiceTail } from "@myCash/common";
import { MutableRefObject } from "react";
import { INVOICES_NOTIFICATIONS_TYPE } from "@myCash/constants";

type InvoiceProps = {
  borderless?: boolean;
  invoice: IInvoiceNotification;
  ref?: MutableRefObject<null>;
};

export const InvoiceNotification: React.FC<InvoiceProps> = ({
  borderless = false,
  invoice,
  ref,
}) => {
  const { t } = useTranslation();

  return (
    <StyledInvoiceContainer borderless={borderless} ref={ref}>
      <img src={invoiceLogo} alt="invoice-logo" />
      <Stack alignItems="center" width="100%" spacing={1}>
        <Typography variant="h5" color="#2d2d2d">
          mycash system
        </Typography>
        {invoice.type === INVOICES_NOTIFICATIONS_TYPE.CREDITOR
          ? t("creditorInvoice")
          : t("debtorInvoice")}
      </Stack>
      <Stack direction="row" gap={"0.5rem"}>
        <InvoiceInfoItem
          label={t("time")}
          value={invoice?.date?(invoice?.date?.split(" ")[1] + invoice?.date?.split(" ")[2]):""}
        />
        <StyledSeparator />
        <InvoiceInfoItem
          label={t("date")}
          value={invoice?.date?.split(" ")[0]}
        />
      </Stack>
      <StyledDivider />
      <Stack>
        {/* TODO after fixing the api  */}

        {String(invoice?.invoice.invoiceNumber) && (
          <InvoiceInfoItem
            label={t("pdf.invoiceNumber")}
            value={`${invoice?.invoice.invoiceNumber} #`}
          />
        )}

        {String(invoice?.id) && (
          <InvoiceInfoItem
            label={t("invoiceNotificationNumber")}
            value={`${invoice?.id} #`}
          />
        )}
      </Stack>
      <StyledDivider />
      <StyledTableHeader>
        <Typography variant="h6" color="#2d2d2d" textAlign="start">
          {t("product")}
        </Typography>
        <Typography variant="h6" color="#2d2d2d" textAlign="center">
          {t("quantity")}
        </Typography>
        <Typography variant="h6" color="#2d2d2d" textAlign="center">
          {t("price")}
        </Typography>
        <Typography variant="h6" color="#2d2d2d" textAlign="end">
          {t("total")}
        </Typography>
      </StyledTableHeader>
      <StyledDivider />
      <Stack>
        {invoice?.products?.map((product,index) => (
          <TableRow
            key={String(product.id) + index}
            product={product?.product} // product here should be of type Product
            quantity={String(product.quantity)}
            price={String(product?.price)}
          />
        ))}
      </Stack>

      <StyledDivider />
      <Stack
        sx={{
          "@media print": {
            gap: "8px",
          },
        }}
      >
        <InvoiceInfoItem
          label={t("pdf.subTotalWithoutTax")}
          value={formatMoney(String(invoice?.price))}
        />
        <InvoiceInfoItem
          label={t("paymentInvoice.method")}
          value={getInvoicePaymentType(invoice?.paymentType)}
        />
        <InvoiceInfoItem
          label={t("discount")}
          value={formatMoney(String(invoice?.totalPrice))}
        />

      </Stack>
      <StyledDivider />
      <SummaryGrid>
        <StyledSeparator />
        {/* <Stack>
        
          <InvoiceInfoItem
            label={t("paymentInvoice.totalPayment")}
            value={formatMoney(invoice?.paid_cashir_price)}
          />
          <InvoiceInfoItem
            label={t("paymentInvoice.remaining")}
            value={formatMoney(invoice?.change_csahir_price)}
          />
        </Stack> */}
      </SummaryGrid>
      <QrCodesContainer>
        <InvoiceQrCode value={invoice?.zatka || ""} label="ZATCA QR" />
        <InvoiceQrCode value={invoice?.zatka || ""} label="MyCash QR" />
      </QrCodesContainer>
      <InvoiceTail />
    </StyledInvoiceContainer>
  );
};

type InvoiceInfoItemProps = {
  label: string;
  value?: string | number;
};
const InvoiceInfoItem: React.FC<InvoiceInfoItemProps> = ({ label, value }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      width="100%"
      sx={{
        "@media print": {
          gap: "20px",
          "h6, p": {
            flex: "1",
          },
        },
      }}
    >
      <Typography variant="body2" color="#2d2d2d">
        {label}
      </Typography>
      <Typography variant="h6" color="#2d2d2d">
        {value}
      </Typography>
    </Stack>
  );
};
type TableRowProps = {
  product: Product;
  quantity: string;
  price: string;
};

const TableRow: React.FC<TableRowProps> = ({ product, quantity, price }) => {
  return (
    <StyledTableItem>
      <Typography variant="body2" color="#2d2d2d" textAlign="start">
        {product?.name}
      </Typography>
      <Typography variant="body2" color="#2d2d2d" textAlign="center">
        {Number(quantity)}
      </Typography>
      <Typography variant="body2" color="#2d2d2d" textAlign="center">
        {formatMoney(String(Math.trunc(Number(price) / Number(quantity))))}
      </Typography>
      <Typography variant="body2" color="#2d2d2d" textAlign="end">
        {formatMoney(String(price))}
      </Typography>
    </StyledTableItem>
  );
};