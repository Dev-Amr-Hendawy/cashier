import { CommonModal, DeleteDialog, InvoiceSettingItem } from "@myCash/common";
import { Edit } from "iconsax-react";
// import { Trash } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditClientForm } from ".";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, clearClient } from "@myCash/lib";
import { useDeleteClient } from "@myCash/hooks";

interface ClientsSettingsModalProps {
  open: boolean;
  handleClose: () => void | void;
}

export const ClientsSettingsModal: React.FC<ClientsSettingsModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const clientState = useSelector((state: RootState) => state.client);
  const {
    mutate,
    isSuccess: deleteIsSuccess,
    isPending: deleteIsPending,
  } = useDeleteClient();
  const deleteHandler = () => {
    clientState.client_id && mutate(clientState.client_id);
    clientState.client_id && dispatch(clearClient());
  };
  return (
    <CommonModal
      open={open}
      hasActions
      title={t("client.settings")}
      handleConfirm={handleClose}
      handleCancel={handleClose}
      handleBackBtn={handleClose}
      handleClose={handleClose}
    >
      <Stack gap={"0.75rem"}>
        <InvoiceSettingItem
          icon={<Edit />}
          id={"clientEdit"}
          name={t("edit")}
          onClick={() => setOpenEdit(true)}
        />
       {/* It will return again  */}
        {/* <InvoiceSettingItem
          icon={<Trash />}
          id={"clientDelete"}
          name={t("delete")}
          onClick={() => setOpenDelete(true)}
        /> */}
        {/* edit modal */}
        <EditClientForm
          handleClose={() => setOpenEdit(false)}
          open={openEdit}
        />
        <DeleteDialog
          handleClose={() => setOpenDelete(false)}
          open={openDelete}
          deleteHandler={deleteHandler}
          deleteSuccess={deleteIsSuccess}
          deletePending={deleteIsPending}
        />
      </Stack>
    </CommonModal>
  );
};
