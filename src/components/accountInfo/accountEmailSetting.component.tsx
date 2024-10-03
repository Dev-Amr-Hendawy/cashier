import { DrawerLink } from "@myCash/common";
import { Sms } from "iconsax-react";
import { useState } from "react";
import { AccountEmailModal } from "@myCash/components";

interface AccountEmailSettingProps {
  email: string;
  updateHandler: (value: { [key: string]: string }, type: "email") => void;
}

export const AccountEmailSetting: React.FC<AccountEmailSettingProps> = ({
  email,
  updateHandler,
}) => {
  const [accountEmailOpen, setAccountEmailOpen] = useState(false);
  return (
    <>
      <DrawerLink
        title="accountInfo.accountEmail"
        icon={<Sms size={24} />}
        link=""
        value={email}
        handleClick={() => setAccountEmailOpen(true)}
        hasArrow
      />
      <AccountEmailModal
        open={accountEmailOpen}
        handleClose={() => setAccountEmailOpen(false)}
        updateHandler={updateHandler}
        defaultValue={email}
      />
    </>
  );
};
