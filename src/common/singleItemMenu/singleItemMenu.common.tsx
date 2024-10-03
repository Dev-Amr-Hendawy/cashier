import { useState } from "react";

import { DeleteDialog } from "@myCash/common";
import { useTranslation } from "react-i18next";
import { Divider, Menu, MenuItem, Stack } from "@mui/material";

import editIcon from "../../assets/images/edit-icon.svg";
import deleteIcon from "../../assets/images/trash-icon.svg";

import "./styles.scss";
import { CommonModalProps } from "@myCash/types/types";

type Props = {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
  id: number | null;
  handleDelete: () => void;
  EditModal?: React.FC<CommonModalProps>;
  deleteSuccess?: boolean;
  deletePending?: boolean;
};

export const SingleItemMenu = ({
  open,
  handleClose,
  anchorEl,
  handleDelete,
  EditModal,
  deletePending,
  deleteSuccess,
  setAnchorEl,
}: Props) => {
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const menuItems = [
    {
      icon: editIcon,
      text: t("productInfo.edit"),
      onClick: () => {
        setEditModalOpen(true);
      },
    },
    {
      icon: deleteIcon,
      text: t("productInfo.delete"),
      onClick: () => setDeleteDialogOpen(true),
    },
  ];

  return (
    <Menu
      className="item-menu-container"
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
    >
      <Stack divider={<Divider sx={{ margin: "4px  !important" }} />}>
        {menuItems.map((item, index) => (
          <MenuItem
            className="menu-single-item"
            key={index}
            onClick={item.onClick}
            // disabled={mutation.isPending && index === 1}
          >
            <img src={item.icon} alt={item.text} />
            {item.text}
          </MenuItem>
        ))}
      </Stack>
      <DeleteDialog
        deleteHandler={() => handleDelete()}
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        deletePending={deletePending}
        deleteSuccess={deleteSuccess}
      />
      {EditModal && (
        <EditModal
          open={editModalOpen}
          handleClose={() => {
            setEditModalOpen(false);
            setAnchorEl(null);
          }}
        />
      )}
    </Menu>
  );
};
