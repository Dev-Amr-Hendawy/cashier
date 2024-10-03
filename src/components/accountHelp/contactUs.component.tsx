import { Typography } from "@mui/material";
import { InvoiceSettingItem } from "@myCash/common";
import { Messages } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ContactUsModal } from "@myCash/components";

interface ContactUsProps {}

export const ContactUs: React.FC<ContactUsProps> = () => {
  const { t } = useTranslation();
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <>
      <Typography variant="h4">{t("accountHelp.contactUs")}</Typography>
      <InvoiceSettingItem
        icon={<Messages size={24} />}
        name={t("accountHelp.needHelp")}
        onClick={() => setContactOpen(true)}
      />
      <ContactUsModal
        open={contactOpen}
        handleClose={() => setContactOpen(false)}
      />
    </>
  );
};
