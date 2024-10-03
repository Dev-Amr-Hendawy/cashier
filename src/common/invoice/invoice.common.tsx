import { InvoiceProduct, InvoiceType } from "@myCash/types/types";
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
  getInvoiceTypeTitle,
} from "@myCash/utils";

import invoiceLogo from "../../assets/icons/invoice-icon.svg";
// import qrLogo from "../../assets/icons/qr-code-icon.svg";
import { useTranslation } from "react-i18next";
import { InvoiceQrCode, InvoiceTail } from "@myCash/common";
import { MutableRefObject } from "react";

type InvoiceProps = {
  borderless?: boolean;
  invoice: InvoiceType;
  ref?: MutableRefObject<null>;
};

export const Invoice: React.FC<InvoiceProps> = ({
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
        <Typography variant="h6" color="#2d2d2d">
          {getInvoiceTypeTitle(invoice?.invoiceType)}
        </Typography>
      </Stack>
      <Stack direction="row" gap={"0.5rem"}>
        <InvoiceInfoItem
          label={t("time")}
          value={invoice?.date.split(" ")[1] + invoice?.date.split(" ")[2]}
        />
        <StyledSeparator />
        <InvoiceInfoItem
          label={t("date")}
          value={invoice?.date.split(" ")[0]}
        />
      </Stack>
      <StyledDivider />
      <Stack>
        {/* TODO after fixing the api  */}
        <InvoiceInfoItem
          label={t("pdf.casheer")}
          value={invoice?.userDate?.name || "---"}
        />
        {invoice?.branch && (
          <InvoiceInfoItem
            label={t("pdf.branch")}
            value={invoice?.branch?.name}
          />
        )}
       
       {String(invoice?.invoiceNumber) && (
          <InvoiceInfoItem
            label={t("pdf.invoiceNumber")}
            value={invoice?.invoiceNumber}
          />
        )}
         {String(invoice?.invoiceOrder) && (
          <InvoiceInfoItem
            label={t("pdf.invoiceOrder")}
            value={invoice?.invoiceOrder}
          />
        )}
        {/* <InvoiceInfoItem label={t("pdf.deviceNumber")} value="2298764111336ERW" />*/}
        <InvoiceInfoItem
          label={t("pdf.taxNumber")}
          value={invoice?.userDate?.accountInfo?.taxRecord}
        />
        {invoice?.client?.name ? (
          <InvoiceInfoItem
            label={t("client.form.name")}
            value={invoice?.client?.name}
          />
        ) : null}
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
        {invoice?.products?.map((product) => (
          <TableRow key={product.id} {...product} />
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
          value={formatMoney(invoice?.productPrice)}
        />
        <InvoiceInfoItem
          label={t("invoice.summary.titleTwo", {
            tax: Number(invoice?.tax),
          })}
          value={formatMoney(invoice?.taxPrice)}
        />
        <InvoiceInfoItem
          label={t("discount")}
          value={formatMoney(invoice?.discountPrice)}
        />
        <InvoiceInfoItem
          label={t("pdf.total")}
          value={formatMoney(invoice?.totalPrice)}
        />
      </Stack>
      <StyledDivider />
      <SummaryGrid>
        <StyledSeparator />
        <Stack>
          <InvoiceInfoItem
            label={t("paymentInvoice.method")}
            value={getInvoicePaymentType(invoice?.paymentType)}
          />
          <InvoiceInfoItem
            label={t("paymentInvoice.totalPayment")}
            value={formatMoney(invoice?.paid_cashir_price)}
          />
          <InvoiceInfoItem
            label={t("paymentInvoice.remaining")}
            value={formatMoney(invoice?.change_csahir_price)}
          />
        </Stack>
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

const TableRow: React.FC<InvoiceProduct> = (props) => {
  return (
    <StyledTableItem>
      <Typography variant="body2" color="#2d2d2d" textAlign="start">
        {props?.product?.name}
      </Typography>
      <Typography variant="body2" color="#2d2d2d" textAlign="center">
        {Number(props?.quantity)}
      </Typography>
      <Typography variant="body2" color="#2d2d2d" textAlign="center">
        {formatMoney(props?.UnitPrice)}
      </Typography>
      <Typography variant="body2" color="#2d2d2d" textAlign="end">
        {formatMoney(props?.productPrice)}
      </Typography>
    </StyledTableItem>
  );
};
