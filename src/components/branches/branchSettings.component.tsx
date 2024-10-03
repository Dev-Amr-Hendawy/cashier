import { HeaderWithMoreIcon } from "@myCash/common";
import { useTranslation } from "react-i18next";
import { BranchSettingsModal } from "@myCash/components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

interface BranchSettingsProps {}

export const BranchSettings: React.FC<BranchSettingsProps> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const branch = useSelector((state: RootState) => state.branch);
  return (
    <>
      <HeaderWithMoreIcon
        title={t("branches.details")}
        onClick={handleOpen}
        hideMore={branch.id ? false : true}
      />
      <BranchSettingsModal open={open} handleClose={handleClose} />
    </>
  );
};
