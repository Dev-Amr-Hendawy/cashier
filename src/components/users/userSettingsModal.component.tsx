import {
  ActiveUserSwitch,
  BackDrop,
  CommonModal,
  DeleteDialog,
  InvoiceSettingItem,
} from "@myCash/common";
import { Edit, Trash } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditUserForm } from ".";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, clearEmployee } from "@myCash/lib";
import {
  useDeleteEmployee,
  useUpdateEmployee,
  useUpdateEmployeeStatus,
} from "@myCash/hooks";

interface UserSettingsModalProps {
  open: boolean;
  handleClose: () => void;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const employeeState = useSelector((state: RootState) => state.employee);

  const { mutate, isPending } = useDeleteEmployee();
  const { mutate: editMutate, isPending: editIsPending } = useUpdateEmployee();
  const { mutate: updateStatus, isPending: updateStatusPending } =
    useUpdateEmployeeStatus();
  const deleteHandler = () => {
    employeeState.id && mutate(employeeState.id);
    employeeState.id && dispatch(clearEmployee());
  };
  const updateHandler = (values: { [key: string]: string }) => {
    employeeState.id && editMutate(values, employeeState.id);
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
      <BackDrop open={updateStatusPending} />
      <Stack gap={"0.75rem"}>
        <ActiveUserSwitch
          label="users.activateUser"
          status={employeeState?.status || undefined}
          handleSwitch={(checked) =>
            updateStatus({
              status: checked ? "1" : "2",
              employee_id: employeeState.id || "",
            })
          }
        />
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
        {/* <InvoiceSettingItem
          icon={<Share />}
          id={"userShare"}
          name={t("share")}
        /> */}
        {/* edit modal */}
        <EditUserForm
          handleClose={() => setOpenEdit(false)}
          open={openEdit}
          submitHandler={updateHandler}
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
