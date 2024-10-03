import { Box, useMediaQuery } from "@mui/material";
import { StyledPaymentDetailsContainer } from "./styles";
import { PaymentDetailsHeader, PaymentDetailsSummary } from ".";
import { Invoice } from "@myCash/common";
import { InvoiceType } from "@myCash/types/types";
import i18n from "@myCash/i18n";
import { useCustomPrint } from "@myCash/hooks";
type Props = {
  paymentData: InvoiceType;
};

export const PaymentDetailsContent: React.FC<Props> = ({ paymentData }) => {
  const language = i18n.language;
  const isTabletView = useMediaQuery("(max-width: 1024px)");
  const { handlePrint, printerRef } = useCustomPrint();
  return (
    <StyledPaymentDetailsContainer>
      <Box
        sx={{
          gridColumn: isTabletView && language === "ar" ? "5/13" : "1/9",
        }}
      >
        <PaymentDetailsHeader />
        <PaymentDetailsSummary
          taxPrice={paymentData?.taxPrice}
          discountPrice={paymentData?.discountPrice}
          totalPrice={paymentData?.totalPrice}
          subTotal={paymentData?.productPrice}
          handlePrint={handlePrint}
          invoiceId={paymentData?.id}
          invoice={paymentData}
        />
      </Box>
      <Box
        sx={{
          gridColumn: isTabletView
            ? language === "ar"
              ? "5/13"
              : "1/9"
            : "9/13",
          gridRow: isTabletView ? "2/5" : "",
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        <div ref={printerRef}>
          <Invoice invoice={paymentData} />
        </div>
      </Box>
    </StyledPaymentDetailsContainer>
  );
};
