import {
  HeaderWithBack,
  ScrollContainer,
  SmallContainer,
} from "@myCash/common";
import {
  CalculatorSingleInput,
  PayRecieptInfo,
  RecieptPaymentTypes,
} from "@myCash/components";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CalculatorSideContainer } from "../payment/styles";

interface PayRecieptContentProps {}

export const PayRecieptContent: React.FC<PayRecieptContentProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="return-invoice-page">
      <SmallContainer
        calculator
        reverse
        aSide={
          <div className="calc-side">
            <CalculatorSideContainer>
              <CalculatorSingleInput />
            </CalculatorSideContainer>
          </div>
        }
        mainSide={
          <ScrollContainer>
            <Stack>
              <HeaderWithBack title={t("client.payReciept")} />
              <RecieptPaymentTypes />
              <PayRecieptInfo />
            </Stack>
          </ScrollContainer>
        }
      />
    </div>
  );
};
