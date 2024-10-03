import { CommonModal, DeleteDialog, InvoiceSettingItem } from "@myCash/common";
import { Edit, Trash } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditExpenseForm } from "@myCash/components";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, clearExpense } from "@myCash/lib";
import { useDeleteExpense, useUpdateExpense } from "@myCash/hooks";

interface ExpenseSettingsModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ExpenseSettingsModal: React.FC<ExpenseSettingsModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const expenseState = useSelector((state: RootState) => state.expense);
  const { mutate, isPending } = useDeleteExpense(handleClose);
  const { mutate: editMutate, isPending: editIsPending } = useUpdateExpense(
    () => {
      setOpenEdit(false);
      handleClose();
    }
  );
  const deleteHandler = () => {
    expenseState.id && mutate(expenseState.id);
    expenseState.id && dispatch(clearExpense());
  };
  const updateHandler = async (values: { [key: string]: string }) => {
    expenseState.id && editMutate(values);
  };
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title={t("filter.title")}
      handleConfirm={handleClose}
      handleCancel={handleClose}
      handleBackBtn={handleClose}
      handleClose={handleClose}
    >
      <Stack gap={"0.75rem"}>
        <InvoiceSettingItem
          icon={<Edit />}
          id={"userEdit"}
          name={t("edit")}
          onClick={() => setOpenEdit(true)}
        />
        <InvoiceSettingItem
          icon={<Trash />}
          id={"userDelete"}
          name={t("delete")}
          onClick={() => setOpenDelete(true)}
        />
        {/* edit modal */}
        <EditExpenseForm
          handleClose={() => setOpenEdit(false)}
          open={openEdit}
          submitHandler={updateHandler}
          buttonNames={{ action: "continue" }}
          isPending={editIsPending}
        />
        <DeleteDialog
          deleteHandler={deleteHandler}
          handleClose={() => setOpenDelete(false)}
          open={openDelete}
          deletePending={isPending}
        />
      </Stack>
    </CommonModal>
  );
};
