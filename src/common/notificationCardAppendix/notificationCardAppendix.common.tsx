import { Stack, Typography } from "@mui/material";
import { InfoCircle, TickCircle } from "iconsax-react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

interface NotificationCardAppendixProps {
  value?: string | number;
  isCompleted: boolean;
}

export const NotificationCardAppendix: React.FC<NotificationCardAppendixProps> = ({
  value,
  isCompleted,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="invoice-card-appendix" bgcolor={isCompleted ? "var(--secondary-darker)" : "var(--primary-main)"}>
      <Stack>
        {isCompleted ? (
          <TickCircle size="24" />
        ) : (
          <InfoCircle size="24" />
        )}
        <Typography
          variant="subtitle2"
          fontWeight={700}
       
        >
          {t(
            isCompleted ? "salesInvoices.completedPayment" : "invoice.notPaid"
          )}
        </Typography>
      </Stack>
      <Typography
        fontWeight={700}
     variant="h6"
      >{`${value} ر.س`}</Typography>
    </Stack>
  );
};
