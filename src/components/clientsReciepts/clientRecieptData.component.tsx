import "./styles.scss";

import { Box, Stack } from "@mui/material";
import {
  Calendar2,
  CardTick1,
  Clock,
  MoneyTime,
  Receipt,
  Receipt1,
} from "iconsax-react";

import { Receipt as IReceipt } from "@myCash/types";
import { IconLabelValueField } from "@myCash/common";
import { useTranslation } from "react-i18next";

interface ClientRecieptDataProps {
  receipt: IReceipt;
}

export const ClientRecieptData: React.FC<ClientRecieptDataProps> = ({
  receipt,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="clients-reciepts-details">
      <Stack className="container-border-padding">
        <IconLabelValueField
          icon={<Receipt1 color="var(--grey-900)" />}
          label={t("client.receipt")}
          value={`#${receipt.id}`}
        />
      </Stack>
      <Stack className="container-border-padding" gap={"12px"}>
        <IconLabelValueField
          icon={<Receipt color="var(--grey-900)" />}
          label={t("invoice.invoiceNo")}
          value={`#${receipt.invoiceData.invoiceNumber}`}
        />
        <IconLabelValueField
          icon={<Clock color="var(--grey-900)" />}
          label={t("timing")}
          value={receipt.invoiceData.date}
        />
        <IconLabelValueField
          icon={<CardTick1 color="var(--grey-900)" />}
          label={t("pdf.total")}
          value={`${Number(
            receipt.invoiceData.totalPrice
          ).toLocaleString()} ${t("currency")}`}
        />
      </Stack>
      <Stack className="container-border-padding reciept-done-payment">
        <IconLabelValueField
          icon={<Receipt1 color="#6EC531" />}
          label={t("client.paymentDone")}
          value={
            receipt?.paymentStatus === 2
              ? Number(
                  Number(receipt.invoiceData.totalPrice) -
                    Number(receipt.amount)
                ).toLocaleString() +
                " " +
                t("currency")
              : receipt?.amount
          }
        />
      </Stack>
      <Stack className="container-border-padding" gap={"12px"}>
        <Box className="reciept-due-payment">
          {receipt?.paymentStatus === 2 && (
            <IconLabelValueField
              icon={<MoneyTime color="#232773" />}
              label={t("client.dueAmount")}
              value={`${Number(receipt.amount).toLocaleString()} ${t(
                "currency"
              )}`}
            />
          )}
        </Box>
        <IconLabelValueField
          icon={<Calendar2 color="var(--grey-900)" />}
          label={t("client.invoiceDate")}
          value={receipt.date}
        />
      </Stack>
    </Stack>
  );
};
