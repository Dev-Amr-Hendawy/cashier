import { Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "..";
import { MoneySend } from "iconsax-react";
import { Expense } from "@myCash/types";
import "./styles.scss";

interface ExpenseGridCardProps {
  onClick?: (expense: Expense) => void;
  expense: Expense;
}

export const ExpenseGridCard: React.FC<ExpenseGridCardProps> = ({
  expense,
  onClick,
}) => {
  return (
    <Stack
      className="container-border-padding"
      onClick={() => onClick && onClick(expense)}
    >
      <IconLabelValueField
        label={"expenses.expense"}
        fixedLabelValue={expense.statement || ""}
        icon={<MoneySend size="24" color="#2D2D2DCC" />}
      />
      <Stack className="expense-card-content">
        {/* address */}
        <Typography variant="h6">{expense.date || ""}</Typography>
        {/* phone */}
        <Typography variant="subtitle2" color={"#232773"}>
          {expense.amount || ""}
        </Typography>
        {/* is default */}
        <Typography variant="subtitle2" color={"#2D2D2DCC"}>
          {expense.note || ""}
        </Typography>
      </Stack>
    </Stack>
  );
};
