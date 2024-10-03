import {
  CartLogo,
} from "@myCash/common/cartContainer/styles";
import {
  ClientInvoicesView,
  ClientsInvoicesHeader,
  ClientsInvoicesSettings,
  ClientsInvoicesSlider,
  // InvoicesMainSlider,
  SingleInvoiceWithActions,
} from "@myCash/components";
import { InvoicesLayout, ScrollContainer } from "@myCash/common";
import {
  Stack,
  // Typography
} from "@mui/material";

import { RootState } from "@myCash/lib";
// import { StyledPadding } from "./styles";
import cartLogo from "../../assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
import { useColorMode, useCustomPrint } from "@myCash/hooks";
import { StyledRightSideContainer } from "./styles";

interface ClientsInvoicesContentProps {}

export const ClientsInvoicesContent: React.FC<
  ClientsInvoicesContentProps
> = () => {
  // const { t } = useTranslation();
  const invoicesState = useSelector((state: RootState) => state.invoices);
  const { client_id } = useParams();
  const { isLightMode } = useColorMode();
  const { handlePrint, printerRef } = useCustomPrint();
  return (
    <InvoicesLayout
      leftSide={
        <ScrollContainer>
          <Stack  className="invoice-table">
            {/* <StyledPadding>
              <Typography variant="h4">{t("invoices")}</Typography>
            </StyledPadding> */}
            <ClientsInvoicesHeader />
            <ClientsInvoicesSlider />
           
              {/* <InvoicesMainSlider /> */}
            
            <ClientInvoicesView client_id={client_id} />
          </Stack>
        </ScrollContainer>
      }
      rightSide={
        <>
          <ClientsInvoicesSettings
            handlePrint={handlePrint}
            invoiceId={invoicesState?.invoice_id}
          />
          
            {invoicesState.invoice_id ? (
              <SingleInvoiceWithActions
                invoice_id={invoicesState.invoice_id}
                printerRef={printerRef}
              />
            ) : (<StyledRightSideContainer>
              <CartLogo
                src={isLightMode ? cartLogo : cartLogoDark}
                alt="cart-logo"
              /></StyledRightSideContainer>
            )}
          
        </>
      }
    />
  );
};
