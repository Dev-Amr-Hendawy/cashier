import {
  CalculatorSide,
  PaymentNotificationMainInfo,
  PaymentTypesButtons,
} from "@myCash/components";
import { PaymentLayout } from "@myCash/common";
import { RootState } from "@myCash/lib";

import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import { StyledMainSide } from "./styles";

export const PaymentNotificationContent = () => {
  const state = useSelector(
    (state: RootState) => state.invoiceSendNotification
  );
  const paymentState = useSelector((state: RootState) => state.payment);


  return (
    <PaymentLayout
      mainSide={
        <StyledMainSide>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              gridColumn: "1/7",
            }}
          >
            <PaymentTypesButtons />
          </Box>
        
          <PaymentNotificationMainInfo
            mainState={state}
           
          />
        </StyledMainSide>
      }
      aside={paymentState.paymentType !== 2 && <CalculatorSide />}
    />
  );
};

