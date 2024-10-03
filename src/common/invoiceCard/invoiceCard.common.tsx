import "./styles.scss";

import {
  IconLabelValueField,
  InvoiceCardAppendix,
  InvoiceProductCount,
} from "@myCash/common";

import { Receipt } from "iconsax-react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface InvoiceCardProps {
  invoiceId: string | number;
  productCount: string;
  invoiceValue: string;
  date: string;
  isCompleted: boolean;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({
  invoiceId,
  productCount,
  invoiceValue,
  date,
  isCompleted,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="container-grey-border">
      <Stack className="invoice-card-container ">
        {/* card content */}
        <IconLabelValueField
          label={t("client.invoice")}
          icon={<Receipt size="25" color="var(--grey-300)" />}
          value={`#${invoiceId}`}
        />
        <Stack color={"var(--grey-600)"} padding={"0 3rem"} gap={"0.5rem"}>
          {/* products count*/}
          <InvoiceProductCount count={productCount} />
          {/* date */}
          <Typography variant="subtitle2">{date}</Typography>
        </Stack>
      </Stack>

      {/* invoice status */}

      <InvoiceCardAppendix isCompleted={isCompleted} value={invoiceValue} />
    </Stack>
  );
};
