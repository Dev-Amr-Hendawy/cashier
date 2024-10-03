import { Stack, Typography } from "@mui/material";
import { InfoCircle, TickCircle } from "iconsax-react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

interface InvoiceCardAppendixProps {
  value: string | number;
  isCompleted: boolean;
}

export const InvoiceCardAppendix: React.FC<InvoiceCardAppendixProps> = ({
  value,
  isCompleted,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="invoice-card-appendix">
      <Stack>
        {isCompleted ? (
          <TickCircle size="16" color="#6EC531" />
        ) : (
          <InfoCircle size="16" color="var(--grey-900)" />
        )}
        <Typography
          variant="subtitle2"
          fontWeight={700}
          color={isCompleted ? "#6EC531" : "var(--grey-900)"}
        >
          {t(
            isCompleted ? "salesInvoices.completedPayment" : "invoice.notPaid"
          )}
        </Typography>
      </Stack>
      <Typography
        fontWeight={700}
        fontSize={"1rem"}
      >{`${value} ر.س`}</Typography>
    </Stack>
  );
};
