import React from "react";
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { INVOICES_NOTIFICATIONS_TYPE } from "@myCash/constants";

interface NotificationSelectTypeProps {
  handleTypeSelect: (type: 1 | 2) => void;
  type: 1 | 2;
}

export const NotificationSelectType: React.FC<NotificationSelectTypeProps> = ({
  handleTypeSelect,
  type,
}) => {
  const { t } = useTranslation();

  return (
    <Stack className="notification-select-container" direction="column" spacing={2}>
       <Typography variant="h5" textAlign="start">{t("invoiceNotifications.notificationType")}</Typography> 
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(_, newType) => {
          if (newType !== null) {
            handleTypeSelect(newType);
          }
        }}
        aria-label="Notification Type"
      >
        <ToggleButton value={INVOICES_NOTIFICATIONS_TYPE.CREDITOR} aria-label="Creditor">
          {t("invoiceNotifications.creditor")}
        </ToggleButton>
        <ToggleButton value={INVOICES_NOTIFICATIONS_TYPE.DEBTOR} aria-label="Debtor"  >
          {t("invoiceNotifications.debtor")} 
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
