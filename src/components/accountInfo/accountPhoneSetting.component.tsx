import { DrawerLink } from "@myCash/common";
import { Call } from "iconsax-react";
import { useState } from "react";
import { AccountPhoneModal } from "@myCash/components";

interface AccountPhoneSettingProps {
  phone: string;
  updateHandler: (value: { [key: string]: string }, type: "phone") => void;
}

export const AccountPhoneSetting: React.FC<AccountPhoneSettingProps> = ({
  phone,
  updateHandler,
}) => {
  const [accountPhoneOpen, setAccountPhoneOpen] = useState(false);
  return (
    <>
      <DrawerLink
        title="accountInfo.accountPhone"
        icon={<Call size={24} />}
        link=""
        value={phone}
        handleClick={() => setAccountPhoneOpen(true)}
        hasArrow
      />
      <AccountPhoneModal
        open={accountPhoneOpen}
        handleClose={() => setAccountPhoneOpen(false)}
        updateHandler={updateHandler}
        defaultValue={phone}
      />
    </>
  );
};
