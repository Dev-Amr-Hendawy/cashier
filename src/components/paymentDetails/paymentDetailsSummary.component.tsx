import { StyledPaymentDetailsSummary, SummaryContainer } from "./styles";

import { CartSummaryItem } from "@myCash/common/cartSummaryItem";
import { CartTotal } from "@myCash/common/cardTotal";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import Button from "../form/Button";
// import { useNavigate } from "react-router-dom";
import { Printer } from "iconsax-react";
import { InvoiceType } from "@myCash/types";
import {  ActionToReturnInvoiceDetails } from "../clientsInvoices";

type Props = {
  taxPrice: string;
  discountPrice: string;
  totalPrice: string;
  subTotal: string;
  handlePrint?: () => void;
  invoiceId: number;
  invoice?:InvoiceType;
};

export const PaymentDetailsSummary: React.FC<Props> = ({
  taxPrice,
  totalPrice,
  discountPrice,
  subTotal,
  handlePrint,
  invoiceId,
  invoice
}) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const startPrice =
  //   Number(totalPrice) - Number(taxPrice) + Number(discountPrice);
  const cartState = useSelector((state: RootState) => state.cart);
  return (
    <StyledPaymentDetailsSummary>
      <SummaryContainer>
        <CartSummaryItem
          title={t("invoice.summary.titleOne")}
          quantity={subTotal}
        />
        <CartSummaryItem
          title={t("invoice.summary.titleTwo", {
            tax: cartState?.taxPercentage * 100,
          })}
          quantity={Number(taxPrice).toLocaleString()}
        />
        <CartSummaryItem
          title={t("invoice.summary.titleThree")}
          quantity={Number(discountPrice).toLocaleString()}
        />
      </SummaryContainer>
      <CartTotal total={Number(totalPrice).toLocaleString()} />
      {/* check to pypass credit invoice BE job */}
      {invoiceId && (
        <Stack className="summary-buttons-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            text={t("print-invoice")}
            startIcon={<Printer size={24} color="var(--grey-0)" />}
          />
       {  invoice?.id &&<ActionToReturnInvoiceDetails invoice={invoice} />}
        </Stack>
      )}
    </StyledPaymentDetailsSummary>
  );
};
