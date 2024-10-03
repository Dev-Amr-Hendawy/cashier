import "./styles.scss";

import {
  PaymentSummaryItem,
  RecieptContent,
  RecieptHeaderBorder,
} from "@myCash/common";

import Button from "../form/Button";
import { Stack } from "@mui/material";
import { TickCircle } from "iconsax-react";

interface PayRecieptInfoProps {}

export const PayRecieptInfo: React.FC<PayRecieptInfoProps> = () => {
  return (
    <Stack className="pay-reciept-info">
      <RecieptHeaderBorder />
      {/* <PaymentClient hideMenu roundedBorders /> */}
      <RecieptContent />
      <PaymentSummaryItem
        firstItem={{ title: "paymentInvoice.cashTotal", quantity: `200 ر.س` }}
        roundedBorders
      />
      <Button
        text="تأكيد الدفع"
        startIcon={<TickCircle color={"#fff"} />}
        notRounded
      />
    </Stack>
  );
};
