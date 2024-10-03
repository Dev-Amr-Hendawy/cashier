import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AddClientContent } from "../../components";
import { RootState } from "../../lib";

export const AddClientHoc: React.FC = () => {
  const { t } = useTranslation();
  const cartState = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AddClientContent
      t={t}
      cartState={cartState}
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
    />
  );
};
