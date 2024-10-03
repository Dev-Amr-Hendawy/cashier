import "./styles.scss";

import { CartSummaryItem } from "@myCash/common";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PaymentSummaryItemProps {
  firstItem: { title: string; quantity: string };
  secondItem?: { title: string; quantity: string };
  roundedBorders?: boolean;
}

export const PaymentSummaryItem: React.FC<PaymentSummaryItemProps> = ({
  firstItem,
  secondItem,
  roundedBorders,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className={roundedBorders ? "item border-radius" : "item"}>
      <CartSummaryItem
        title={t(firstItem.title)}
        quantity={firstItem.quantity}
      />
      {secondItem && (
        <CartSummaryItem
          title={t(secondItem.title)}
          quantity={secondItem.quantity}
        />
      )}
    </Stack>
  );
};
