import { Trash } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";

import "./styles.scss";

import { CommonModal } from "@myCash/common";

interface DeleteDialogProps {
  open: boolean;
  deleteHandler: () => void;
  handleClose: () => void;
  deletePending?: boolean;
  deleteSuccess?: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  deleteHandler,
  handleClose,
  deletePending,
}) => {
  const { t } = useTranslation();
  return (
    <CommonModal
      hasActions
      open={open}
      title={t("deleteItem")}
      buttonsNames={{ action: t("delete") }}
      handleConfirm={deleteHandler}
      handleClose={handleClose}
      loading={deletePending}
    >
      <Stack className="delete-dialog-container">
        <Trash size="80" color="#232773" />
        <Typography variant="h2">{t("confirmDeleteItem")}</Typography>
        <Typography variant="subtitle1" color={"#2D2D2D99"}>
          {t("confirmDeleteItemDesc")}
        </Typography>
      </Stack>
    </CommonModal>
  );
};
