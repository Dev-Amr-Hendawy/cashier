import { useState } from "react";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Headphone, Lock } from "iconsax-react";
import { ChangePasswordModal } from "@myCash/components";
import {
  InvoiceSettingItem,
  ScrollContainer,
  SecondaryMainLayout,
} from "@myCash/common";
import { useNavigate } from "react-router-dom";

interface AccountSecurityContentProps {}

export const AccountSecurityContent: React.FC<
  AccountSecurityContentProps
> = () => {
  const { t } = useTranslation();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <ScrollContainer>
      <SecondaryMainLayout title="accountSecurity.title">
        <Stack gap={"12px"} width={"50vw"} className="secondary-main-container">
          <InvoiceSettingItem
            icon={<Lock size={24} />}
            name={t("accountSecurity.changePassword")}
            hasArrow
            onClick={() => setChangePasswordOpen(true)}
          />
          <InvoiceSettingItem
            icon={<Headphone size={24} />}
            name={t("accountSecurity.help")}
            hasArrow
            onClick={() => navigate("/account-help")}
          />
        </Stack>
        <ChangePasswordModal
          open={changePasswordOpen}
          handleClose={() => setChangePasswordOpen(false)}
        />
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
