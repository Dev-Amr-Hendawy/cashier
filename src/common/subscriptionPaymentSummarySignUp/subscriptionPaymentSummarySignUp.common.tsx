import "./styles.scss";

import { Stack, Typography } from "@mui/material";

import { DiscountPromoInput, IconLabelValueField } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Circle from "@myCash/features/authentication/components/Circle";

interface SubscriptionPaymentSummarySignUpProps {
  totalPrice: string | number;
  tax: string | number;
  discount: string | number;
  initialPrice: number;
  taxPercentage?: string;
  submitHandler: (values: { [key: string]: string }) => void;
  helperText?: string;
}

export const SubscriptionPaymentSummarySignUp: React.FC<
  SubscriptionPaymentSummarySignUpProps
> = ({
  totalPrice,
  tax,
  discount,
  initialPrice,
  taxPercentage,
  submitHandler,

}) => {
  const { t } = useTranslation();
  const cartState = useSelector((state: RootState) => state.cart);
  return (
    <Stack gap={"12px"}>
      {/* header */}
      
        <Stack spacing={1} gap={"10px"} padding={"1rem"} direction={"row"} alignItems={"center"}>
        <Circle />   <Typography fontSize={35} fontWeight={600}>
           
            {t("signUp.steps.billingPayment")}
          </Typography>
        </Stack>
     
      {/* Summary card */}
      <Stack spacing={1}>
        {/* payment details */}
        <Stack className="subscription-payment-summary">
          <IconLabelValueField
            label={t("invoice.summary.titleOne")}
            value={initialPrice}
          />
          <IconLabelValueField
            label={t("invoice.summary.titleTwo", {
              tax: taxPercentage
                ? taxPercentage
                : cartState?.taxPercentage * 100,
            })}
            value={tax}
          />
          <IconLabelValueField
            label={t("invoice.summary.titleThree")}
            value={discount}
          />
        </Stack>
        {/* total */}

        <DiscountPromoInput
          submitHandler={(v) => submitHandler(v)}
    
        />
       
      </Stack> 
      <Stack className="subscription-summary-total" sx={{mt:5,borderRadius:5}}>
          <IconLabelValueField label={t("invoice.total")} value={totalPrice} />
        </Stack>
    </Stack>
  );
};
