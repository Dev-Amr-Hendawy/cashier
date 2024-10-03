import { useState } from "react";

export const useModalHandler = () => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };
  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };
  return { openFilterModal, handleOpenFilterModal, handleCloseFilterModal };
};
