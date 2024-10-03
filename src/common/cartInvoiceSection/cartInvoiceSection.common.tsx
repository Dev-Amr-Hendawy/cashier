import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { InvoiceType } from "../invoiceType";
import { StyledContainer } from "./styles";
import { FaBasketShopping } from "react-icons/fa6";
import { RiFilePaper2Line } from "react-icons/ri";
import { RootState } from "../../lib";
import { useSelector } from "react-redux";

export const CartInvoiceSection = () => {
  const { t } = useTranslation();
  // TODO use enums for each type
  const invoicesMainTypes = [
    {
      title: t("invoice.buyInvoice"),
      logo: <FaBasketShopping />,
      type: 2,
    },
    {
      title: t("invoice.salesInvoice"),
      logo: <FaBasketShopping />,
      type: 1,
    },
  ];
  const invoices = [
    {
      title: t("invoice.taxInvoice"),
      logo: <RiFilePaper2Line />,
      type: 2,
    },
    {
      title: t("invoice.simpleInvoice"),
      logo: <RiFilePaper2Line />,
      type: 1,
    },
  ];

  const cartState = useSelector((state: RootState) => state.cart);
  return (
    <StyledContainer spacing={2}>
      <Typography variant="h6" color="grey.800">
        {t("invoice.type")}
      </Typography>
      {/* hidden 	nvoice type section (and it is always a selling bill for now) for now but will used  */}
      <Stack direction="row" justifyContent="space-between" spacing={1} display={"none"} >
        {invoicesMainTypes.map((invoice, index) => (
          <InvoiceType
            invoiceType={invoice.type}
            key={index}
            title={invoice.title}
            logo={invoice.logo}
            active={cartState.invoiceType === invoice.type}
            isSellOrBuy
          />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        {invoices.map((invoice, index) => (
          <InvoiceType
            invoiceType={invoice.type}
            key={index}
            title={invoice.title}
            logo={invoice.logo}
            active={cartState.invoiceTaxType === invoice.type}
          />
        ))}
      </Stack>
    </StyledContainer>
  );
};
