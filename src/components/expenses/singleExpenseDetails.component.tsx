import { Box, Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { CardTick, Clock, MoneySend } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface SingleExpenseDetailsProps {}

export const SingleExpenseDetails: React.FC<SingleExpenseDetailsProps> = () => {
  const { t } = useTranslation();
  const expense = useSelector((state: RootState) => state.expense);
  return (
    <Stack className="user-details-container">
      {/* branch id */}
      <Stack className="container-border-padding">
        <IconLabelValueField
          icon={<MoneySend color="#2D2D2D" />}
          label={t("expenses.expenseId")}
          value={expense?.id || ""}
        />
      </Stack>
      {/* expense data */}
      <Stack>
        <Stack className="container-border-padding" gap={"0.75rem"}>
          <Typography variant="h4" mb={"4px"}>
            {expense?.statement || ""}
          </Typography>
          <IconLabelValueField
            icon={<Clock size={24} color="#2D2D2D" />}
            label={t("timing")}
            value={expense?.date || ""}
          />
          <Box className="expense-card-amount">
            <IconLabelValueField
              icon={<CardTick size={24} color="#2D2D2D" />}
              label={t("expenses.totalAmount")}
              value={expense?.amount || ""}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
