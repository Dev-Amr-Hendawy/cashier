import { Divider, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import editIcon from "../../assets/images/edit-icon.svg";
import deleteIcon from "../../assets/images/trash-icon.svg";
import { useDeleteProduct } from "../../hooks";
import { StyledMenu, StyledMenuItem } from "./styles";

type Props = {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  id: number;
  handleEditModal: () => void;
};

export const HomeSingleProductMenu = ({ open, handleClose, anchorEl, id, handleEditModal }: Props) => {
  const { t } = useTranslation();
  const { mutation, handleDelete } = useDeleteProduct({ id, handleClose });

  const menuItems = [
    {
      icon: editIcon,
      text: t("productInfo.edit"),
      onClick: () => {
        handleEditModal();
        handleClose();
      },
    },
    {
      icon: deleteIcon,
      text: t("productInfo.delete"),
      onClick: handleDelete,
    },
  ];

  return (
    <StyledMenu open={open} onClose={handleClose} anchorEl={anchorEl}>
      <Stack divider={<Divider sx={{ margin: "4px  !important" }} />}>
        {menuItems.map((item, index) => (
          <StyledMenuItem key={index} onClick={item.onClick} disabled={mutation.isPending && index === 1}>
            <img src={item.icon} alt={item.text} />
            {item.text}
          </StyledMenuItem>
        ))}
      </Stack>
    </StyledMenu>
  );
};
