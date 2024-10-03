import { CoupledButton, CoupledInput, CoupledTextField } from "@myCash/common";
import { TFunction } from "i18next";
import { FaHeadphones } from "react-icons/fa6";
import saudiFlag from "@myCash/assets/icons/flag.svg";
import TextField from "@myCash/components/form/TextField";

export const checkCodeInputs = (t: TFunction<"translation", undefined>) => [
  {
    title: t("forgetPassword.stepOne.options.email.title"),
    description: t("forgetPassword.stepOne.options.email.description"),
    id: "2",
    textfield: (
      <TextField
        name="email"
        label={t("forgetPassword.stepOne.options.email.textfield")}
        startIcon={<FaHeadphones />}
      />
    ),
  },
  {
    title: t("forgetPassword.stepOne.options.phone.title"),
    description: t("forgetPassword.stepOne.options.phone.description"),
    id: "1",
    textfield: (
      <CoupledInput
        leftField={
          <CoupledButton
            title={t("966+")}
            icon={<img src={saudiFlag} alt="saudi-flag" />}
            disabled
          />
        }
        rightField={
          <CoupledTextField
            order="second"
            name="phone"
            placeholder={t("login.form.phone")}
            key="phone"
          />
        }
      />
    ),
  },
];
