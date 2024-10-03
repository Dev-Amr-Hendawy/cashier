import { useState } from "react";

import { useTranslation } from "react-i18next";
import { HeaderWithMoreIcon } from "@myCash/common";
import { UserSettingsModal } from "@myCash/components";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

interface UserSettingsProps {}

export const UserSettings: React.FC<UserSettingsProps> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const employeeState = useSelector((state: RootState) => state.employee);

  return (
    <>
      <HeaderWithMoreIcon
        title={t("users.details")}
        onClick={handleOpen}
        hideMore={employeeState.id ? false : true}
      />
      {employeeState.id && (
        <UserSettingsModal open={open} handleClose={handleClose} />
      )}
    </>
  );
};
