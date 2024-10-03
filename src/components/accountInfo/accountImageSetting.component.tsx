import { InvoiceSettingItem } from "@myCash/common";
import { Gallery } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccountImageModal } from "./accountImageModal.component";
import logoImage from "@myCash/assets/images/my-cash-small.svg";
import logoImageDark from "@myCash/assets/images/auth-logo-dark.svg";
import { useColorMode } from "@myCash/hooks";
interface AccountImageSettingProps {
  image: string;
  updateHandler: (value: { [key: string]: string }) => void;
  profilePending: boolean;
}

export const AccountImageSetting: React.FC<AccountImageSettingProps> = ({
  image,
  updateHandler,
  profilePending,
}) => {
  const [imageOpen, setImageOpen] = useState(false);
  const { t } = useTranslation();
  const { isLightMode } = useColorMode();
  return (
    <>
      <InvoiceSettingItem
        icon={<Gallery size={24} />}
        name={t("accountInfo.profileImage")}
        hasArrow
        onClick={() => setImageOpen(true)}
        image={image || (isLightMode ? logoImage : logoImageDark)}
      />
      <AccountImageModal
        open={imageOpen}
        handleClose={() => setImageOpen(false)}
        defaultValue={image || logoImage}
        updateHandler={updateHandler}
        profilePending={profilePending}
      />
    </>
  );
};
