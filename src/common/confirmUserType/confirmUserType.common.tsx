import { ReactNode } from "react";

import { Stack } from "@mui/material";
import { ModalDescription } from "@myCash/common";
import ForgetAccordion from "@myCash/features/authentication/components/forget_components/ForgetAccordion";

import "./styles.scss";
import { checkCodeInputs } from "@myCash/constants";
import { useTranslation } from "react-i18next";

interface ConfirmUserTypeProps {
  children?: ReactNode;
  type: "1" | "2" | ""; //1-phone 2-email "" for initial
  showBoth?: boolean;
}

export const ConfirmUserType: React.FC<ConfirmUserTypeProps> = ({
  children,
  type,
  showBoth,
}) => {
  const { t } = useTranslation();
  const inputs = checkCodeInputs(t);
  return (
    <Stack gap={"1.5rem"} className="confirm-user-type-container">
      <ModalDescription description="forgetPassword.stepOne.title" />
      <Stack spacing={1.5}>
        <ForgetAccordion
          inputs={type === "1" ? inputs[1] : inputs[0]}
          showBoth={showBoth}
        />
      </Stack>
      {children && children}
    </Stack>
  );
};
