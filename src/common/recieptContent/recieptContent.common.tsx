import "./styles.scss";

import {
  Calendar2,
  CardTick1,
  Clock,
  MoneyTime,
  Receipt,
  Receipt1,
} from "iconsax-react";

import { IconLabelValueField } from "..";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RecieptContentProps {}

export const RecieptContent: React.FC<RecieptContentProps> = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack className="container-border-padding" gap={"12px"}>
        <IconLabelValueField
          icon={<Receipt color="#2D2D2D" />}
          label={t("invoice.invoiceNo")}
          value="#1"
        />
        <IconLabelValueField
          icon={<Clock color="#2D2D2D" />}
          label={t("timing")}
          value="#1"
        />
        <IconLabelValueField
          icon={<CardTick1 color="#2D2D2D" />}
          label={t("pdf.total")}
          value="#1"
        />
      </Stack>
      <Stack className="container-border-padding reciept-done-payment">
        <IconLabelValueField
          icon={<Receipt1 color="#6EC531" />}
          label={t("client.paymentDone")}
          value="#1"
        />
      </Stack>
      <Stack
        className="container-border-padding reciept-due-payment"
        gap={"12px"}
      >
        <IconLabelValueField
          icon={<MoneyTime color="#232773" />}
          label={t("client.dueAmount")}
          value="#1"
        />
        <IconLabelValueField
          icon={<Calendar2 color="#2D2D2D" />}
          label={t("client.invoiceDate")}
          value="#1"
        />
      </Stack>
    </>
  );
};
