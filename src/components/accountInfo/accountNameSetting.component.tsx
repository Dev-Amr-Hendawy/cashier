import { DrawerLink } from "@myCash/common";
import { Subtitle } from "iconsax-react";
import { useState } from "react";
import { AccountNameModal } from "./accountNameModal.component";

interface AccountNameSettingProps {
  name: string;
  updateHandler: (value: { [key: string]: string }) => void;
  profilePending: boolean;
}

export const AccountNameSetting: React.FC<AccountNameSettingProps> = ({
  name,
  updateHandler,
  profilePending,
}) => {
  const [accountNameOpen, setAccountNameOpen] = useState(false);
  return (
    <>
      <DrawerLink
        title="accountInfo.accountName"
        icon={<Subtitle size={24} />}
        link=""
        value={name}
        handleClick={() => setAccountNameOpen(true)}
        hasArrow
      />
      <AccountNameModal
        open={accountNameOpen}
        handleClose={() => setAccountNameOpen(false)}
        updateHandler={updateHandler}
        defaultValue={name}
        profilePending={profilePending}
      />
    </>
  );
};
