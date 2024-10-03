import { Stack, Typography } from "@mui/material";
import { InvoiceSettingItem } from "@myCash/common";
import {
  ArrangeHorizontalCircle,
  DocumentText,
  Information,
  MessageQuestion,
  Security,
} from "iconsax-react";
import { useTranslation } from "react-i18next";
import {
  AboutModal,
  GuideModal,
  PrivacyPolicyModal,
  ReturnPolicyModal,
  TermsModal,
} from "@myCash/components";
import { useState } from "react";

interface KnowMoreProps {}

export const KnowMore: React.FC<KnowMoreProps> = () => {
  const { t } = useTranslation();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <>
      <Typography variant="h4">{t("accountHelp.knowMore")}</Typography>
      <Stack gap={"12px"}>
        <InvoiceSettingItem
          icon={<Information size={24} />}
          name={t("accountHelp.about")}
          onClick={() => setAboutOpen(true)}
        />
        <InvoiceSettingItem
          icon={<Security size={24} />}
          name={t("accountHelp.privacyPolicy")}
          onClick={() => setPrivacyOpen(true)}
        />
        <InvoiceSettingItem
          icon={<ArrangeHorizontalCircle size={24} />}
          name={t("accountHelp.returnPolicy")}
          onClick={() => setReturnOpen(true)}
        />
        <InvoiceSettingItem
          icon={<DocumentText size={24} />}
          name={t("accountHelp.terms")}
          onClick={() => setTermsOpen(true)}
        />
        <InvoiceSettingItem
          icon={<MessageQuestion size={24} />}
          name={t("accountHelp.guide")}
          onClick={() => setGuideOpen(true)}
        />
      </Stack>
      <AboutModal open={aboutOpen} handleClose={() => setAboutOpen(false)} />
      <PrivacyPolicyModal
        open={privacyOpen}
        handleClose={() => setPrivacyOpen(false)}
      />
      <ReturnPolicyModal
        open={returnOpen}
        handleClose={() => setReturnOpen(false)}
      />
      <TermsModal open={termsOpen} handleClose={() => setTermsOpen(false)} />
      <GuideModal open={guideOpen} handleClose={() => setGuideOpen(false)} />
    </>
  );
};
