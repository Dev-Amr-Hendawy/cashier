import "./styles.scss";

import { Stack, Typography } from "@mui/material";

import { IconLabelValueField } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface SubscriptionsPaymentSummaryProps {
  totalPrice: string | number;
  tax: string | number;
  discount: string | number;
  initialPrice: number;
  taxPercentage?: string;
}

export const SubscriptionsPaymentSummary: React.FC<
  SubscriptionsPaymentSummaryProps
> = ({ totalPrice, tax, discount, initialPrice, taxPercentage }) => {
  const { t } = useTranslation();
  const cartState = useSelector((state: RootState) => state.cart);
  return (
    <Stack gap={"12px"}>
      {/* header */}
      <Stack gap={"10px"} padding={"1rem"}>
        <Typography fontSize={35} fontWeight={600}>
          {t("paymentMethod.title")}
        </Typography>
        <Typography variant="subtitle1" color="var(--grey-600)">
          {t("subscriptions.paymentDescription")}
        </Typography>
      </Stack>
      {/* Summary card */}
      <Stack className="container-grey-border">
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
        <Stack className="subscription-summary-total">
          <IconLabelValueField label={t("invoice.total")} value={totalPrice} />
        </Stack>
      </Stack>
    </Stack>
  );
};
