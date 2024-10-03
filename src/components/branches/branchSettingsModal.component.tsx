import {
  ActiveUserSwitch,
  CommonModal,
  // DeleteDialog,
  InvoiceSettingItem,
} from "@myCash/common";
import { Edit, 
  // Trash 
} from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditBranchForm } from "@myCash/components";
import { Stack } from "@mui/material";
import {
  //  useDispatch,
   useSelector } from "react-redux";
import { RootState, 
  // clearBranch 
} from "@myCash/lib";
import { 
  // useDeleteBranch,
   useUpdateBranch } from "@myCash/hooks";

interface BranchSettingsModalProps {
  open: boolean;
  handleClose: () => void;
}

export const BranchSettingsModal: React.FC<BranchSettingsModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  const branchState = useSelector((state: RootState) => state.branch);
  // const { mutate, isPending } = useDeleteBranch(handleClose);
  const { mutate: editMutate, isPending: editIsPending } = useUpdateBranch(
    () => {
      setOpenEdit(false);
      handleClose();
    }
  );
  // const deleteHandler = () => {
  //   branchState.id && mutate(branchState.id);
  //   branchState.id && dispatch(clearBranch());
  // };
  const updateHandler = async (values: { [key: string]: string }) => {
    branchState.id && editMutate(values);
  };
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title={t("settings.title")}
      handleConfirm={handleClose}
      handleCancel={handleClose}
      handleBackBtn={handleClose}
      handleClose={handleClose}
    >
      <Stack gap={"0.75rem"}>
        <ActiveUserSwitch
          label="branches.activateBranch"
          status={branchState?.status ? branchState.status : 0}
          handleSwitch={(e) =>
            updateHandler({
              status: e ? "1" : "2",
              branch_id: branchState.id || "",
              // isMain: "0",
            })
          }
        />
        <InvoiceSettingItem
          icon={<Edit />}
          id={"userEdit"}
          name={t("edit")}
          onClick={() => setOpenEdit(true)}
        />
        {/* <InvoiceSettingItem
          icon={<Trash />}
          id={"userDelete"}
          name={t("delete")}
          onClick={() => setOpenDelete(true)}
        /> */}
        {/* <InvoiceSettingItem
          icon={<MinusCirlce />}
          id={"suspend"}
          name={t("branches.suspend")}
        /> */}
        {/* edit modal */}
        <EditBranchForm
          handleClose={() => setOpenEdit(false)}
          open={openEdit}
          submitHandler={updateHandler}
          isPending={editIsPending}
        />
        {/* <DeleteDialog
          deleteHandler={deleteHandler}
          handleClose={() => setOpenDelete(false)}
          open={openDelete}
          deletePending={isPending}
        /> */}
      </Stack>
    </CommonModal>
  );
};
