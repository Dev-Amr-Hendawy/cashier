import {
  CalculatorSide,
  ReturnInvoiceInfo,
  ReturnPaymentTypes,
} from "@myCash/components";
import {
  HeaderWithBack,
  ScrollContainer,
  SmallContainer,
} from "@myCash/common";

import { InvoiceType } from "@myCash/types";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface InvoiceReturnContentProps {
  invoice: InvoiceType;
}

export const InvoiceReturnContent: React.FC<InvoiceReturnContentProps> = ({
  invoice,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="return-invoice-page">
      <SmallContainer
        calculator
        reverse
        aSide={
          <div className="calc-side">
            <CalculatorSide disabled />
          </div>
        }
        mainSide={
          <ScrollContainer>
            <Stack>
              <HeaderWithBack
                title={t("invoice.returnInvoice")}
                handleClose={handleGoBack}
              />
              <ReturnPaymentTypes paymentType={invoice.paymentType} />
              <ReturnInvoiceInfo invoice={invoice} />
            </Stack>
          </ScrollContainer>
        }
      />
    </div>
  );
};
