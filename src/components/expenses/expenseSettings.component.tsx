import { HeaderWithMoreIcon } from "@myCash/common";
import { useTranslation } from "react-i18next";
import { ExpenseSettingsModal } from "@myCash/components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

interface ExpenseSettingsProps {}

export const ExpenseSettings: React.FC<ExpenseSettingsProps> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const expense = useSelector((state: RootState) => state.expense);
  return (
    <>
      <HeaderWithMoreIcon
        title={t("expenses.details")}
        onClick={handleOpen}
        hideMore={expense.id ? false : true}
      />
      <ExpenseSettingsModal open={open} handleClose={handleClose} />
    </>
  );
};
